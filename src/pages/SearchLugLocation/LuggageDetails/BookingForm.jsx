import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import moment from 'moment-timezone';

const BookingForm = ({
  handleSubmit,
  luggageQuantity,
  setLuggageQuantity,
  promoCode,
  setPromoCode,
  discount,
  setDiscount,
  checkinTime,
  setCheckinTime,
  checkoutTime,
  setCheckoutTime,
  totalPrice,
  setTotalPrice,
  locationid,
  clientId,
  clientDetails,
  setClientDetails
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Define the Australian time zone
  const australianTimeZone = 'Australia/Sydney';

  useEffect(() => {
    // Set default check-in and check-out times
    const checkin = moment().tz(australianTimeZone).add(6, 'hours').format('YYYY-MM-DDTHH:mm');
    const checkout = moment(checkin).tz(australianTimeZone).add(20, 'hours').format('YYYY-MM-DDTHH:mm');

    setCheckinTime(checkin);
    setCheckoutTime(checkout);

    setTotalPrice(0);
    setDiscount(0);
  }, [setTotalPrice, setDiscount, setCheckinTime, setCheckoutTime]);

  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      setErrorMessage("Invalid promo code. Please try again.");
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setDiscount(0);
    setPromoApplied(false);
  };

  const handleCheckoutTimeChange = (e) => {
    const newCheckoutTime = e.target.value;
    if (new Date(newCheckoutTime) < new Date(checkinTime)) {
      setErrorMessage('Pickup date can\'t be before the drop-off date.');
    } else {
      setErrorMessage('');
      setCheckoutTime(newCheckoutTime);
    }
  };
  
  const calculateDuration = (checkin, checkout) => {
    if (!checkin || !checkout) return 1;
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const duration = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    return duration > 0 ? duration : 1;
  };

  const validateDateTime = (checkin, checkout) => {
    const now = new Date();
    if (new Date(checkin) < now) {
      setErrorMessage('Check-in time must be in the future.');
      return false;
    } else if (new Date(checkout) < new Date(checkin)) {
      setErrorMessage('Pickup date can\'t be before the drop-off date.');
      return false;
    }
    setErrorMessage('');
    return true;
  };
  
  useEffect(() => {
    if (validateDateTime(checkinTime, checkoutTime) && checkinTime && checkoutTime) {
      const dailyRate = 10.50; // Combined service fee and luggage price per day
      const duration = calculateDuration(checkinTime, checkoutTime);
      let price = (dailyRate * duration * luggageQuantity) - discount;
      price = parseFloat(price.toFixed(2)); // Round to two decimal places
      setTotalPrice(price > 0 ? price : 0);
    }
  }, [discount, checkinTime, checkoutTime, luggageQuantity, setTotalPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails({
      ...guestDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setClientDetails({
      ...clientDetails,
      luggagePhotos: files,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!guestDetails.name && !clientId) newErrors.name = 'Name is required';
    if (!guestDetails.email && !clientId) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(guestDetails.email) && !clientId) {
      newErrors.email = 'Email is invalid';
    }
    if (!guestDetails.phone && !clientId) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (!validateDateTime(checkinTime, checkoutTime)) {
      return;
    }

    setLoading(true); // Set loading to true

    const bookingData = {
      location: locationid,
      startDate: moment(checkinTime).tz(australianTimeZone).format('YYYY-MM-DD'),
      startTime: moment(checkinTime).tz(australianTimeZone).format('HH:mm'),
      endDate: moment(checkoutTime).tz(australianTimeZone).format('YYYY-MM-DD'),
      endTime: moment(checkoutTime).tz(australianTimeZone).format('HH:mm'),
      totalPricePaid: parseFloat(totalPrice).toFixed(2),
      specialRequests: clientDetails.specialRequests || 'No requirement',
    };

    if (clientId) {
      bookingData.client = clientId;
    } else {
      bookingData.guest = {
        name: guestDetails.name,
        email: guestDetails.email,
        phone: guestDetails.phone
      };
    }

    try {
      await handleSubmit(bookingData, guestDetails);
      setShowModal(false); // Close modal on successful submission
    } catch (error) {
      setErrorMessage('Submission failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
};
  

  const openUserDetailsModal = () => {
    if (validateDateTime(checkinTime, checkoutTime)) {
      setShowModal(true);
    } else {
      setErrorMessage('Please fill out all required fields before proceeding.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h5 className="text-2xl font-bold mb-4">Your Booking</h5>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form id="booking-form" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <label>
            Drop off:
            <input 
              type="datetime-local" 
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              value={checkinTime}
              onChange={(e) => setCheckinTime(e.target.value)}
              required
            />
          </label>
          <label>
            Pick up:
            <input 
              type="datetime-local" 
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              value={checkoutTime}
              onChange={handleCheckoutTimeChange}
              required
            />
          </label>

        </div>
        <div className="mb-4">
          <label htmlFor="luggageQuantity" className="block font-bold mb-1">Number of Bags:</label>
          <div className="flex items-center">
            <input 
              type="number" 
              className="w-full p-2 border border-gray-300 rounded" 
              id="luggageQuantity" 
              name="luggageQuantity" 
              value={luggageQuantity} 
              onChange={(e) => setLuggageQuantity(Number(e.target.value))} 
              required 
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="promoCode" className="block font-bold mb-1">Promo Code:</label>
          <div className="flex items-center">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              id="promoCode" 
              name="promoCode" 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
            />
            {promoApplied ? (
              <button 
                type="button" 
                className="ml-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300"
                onClick={handleRemovePromo}
              >
                Remove
              </button>
            ) : (
              <button 
                type="button" 
                className="ml-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-300"
                onClick={handleApplyPromo}
              >
                Apply
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4">
  <h6 className="font-bold mb-2">Price details</h6>

  <div className="flex justify-between">
  <span>
    {luggageQuantity} Checked bag{luggageQuantity > 1 ? 's' : ''} (A${(7.90).toFixed(2)}) x{' '}
    {calculateDuration(checkinTime, checkoutTime)} day{calculateDuration(checkinTime, checkoutTime) > 1 ? 's' : ''}
  </span>
  <span>
    A${(luggageQuantity * 7.90 * calculateDuration(checkinTime, checkoutTime)).toFixed(2)}
  </span>
</div>

{/* <div className="flex justify-between">
  <span>Service Charge per day</span>
  <span>A${(2.60).toFixed(2)}</span>
</div> */}

<div className="flex justify-between pt-2">
  <span>Total Service Charge per day (A$2.60 x {calculateDuration(checkinTime, checkoutTime)} day{calculateDuration(checkinTime, checkoutTime) > 1 ? 's' : ''})</span>
  <span>A${(2.60 * calculateDuration(checkinTime, checkoutTime)).toFixed(2)}</span>
</div>


    <div className="flex justify-between font-bold text-xl mt-4">
      <span>Total</span>
      <span>A${totalPrice.toFixed(2)}</span>
    </div>
  </div>


        <Button 
          variant="primary" 
          onClick={openUserDetailsModal} 
          className="w-full bg-[#1A73A7] text-white py-2 rounded hover:bg-blue-700 transition duration-300 mb-2"
          disabled={!checkinTime || !checkoutTime}
        >
          Book Now
        </Button>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="modal-dialog-centered">
        <Modal.Header closeButton className="bg-[#1A73A7] text-white">
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-100 p-6 rounded-lg">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner animation="border" variant="primary" />
              <span className="ml-3 text-gray-500">Submitting...</span>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {!clientId && (
                <>
                  <div>
                    <label htmlFor="clientName" className="block font-semibold mb-1">Name:</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="clientName"
                      name="name"
                      value={guestDetails.name}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="clientEmail" className="block font-semibold mb-1">Email:</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="clientEmail"
                      name="email"
                      value={guestDetails.email}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="clientPhone" className="block font-semibold mb-1">Phone Number:</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="clientPhone"
                      name="phone"
                      value={guestDetails.phone}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                  </div>
                </>
              )}
              <div>
                <label htmlFor="luggagePhotos" className="block font-semibold mb-1">Luggage Photos (optional):</label>
                <input
                  type="file"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  id="luggagePhotos"
                  name="luggagePhotos"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <Button variant="primary" type="submit" className="w-full bg-[#1A73A7] text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300">
                Submit
              </Button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Show error message */}
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingForm;
