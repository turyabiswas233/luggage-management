import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDetailsModal = ({ showModal, setShowModal, clientDetails, setClientDetails, handleSubmit, isLoggedIn }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientDetails({
      ...clientDetails,
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
    if (!clientDetails.specialRequests) newErrors.specialRequests = 'Special requests are required';
    if (!clientDetails.notes) newErrors.notes = 'Notes are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit({ ...clientDetails });
      setShowModal(false); // Close the modal on successful submit
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton className="bg-primary text-white d-flex justify-content-center align-items-center">
        <Modal.Title className="text-center w-100">User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light p-4 rounded-lg">
        <form onSubmit={handleFormSubmit} className="space-y-3">
          {isLoggedIn ? (
            <>
              <div>
                <label htmlFor="specialRequests" className="block font-semibold mb-1">Special Requests:</label>
                <textarea
                  className="form-control"
                  id="specialRequests"
                  name="specialRequests"
                  value={clientDetails.specialRequests}
                  onChange={handleInputChange}
                />
                {errors.specialRequests && <p className="text-danger">{errors.specialRequests}</p>}
              </div>
              <div>
                <label htmlFor="notes" className="block font-semibold mb-1">Notes:</label>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  value={clientDetails.notes}
                  onChange={handleInputChange}
                />
                {errors.notes && <p className="text-danger">{errors.notes}</p>}
              </div>
              <div>
                <label htmlFor="luggagePhotos" className="block font-semibold mb-1">Luggage Photos (optional):</label>
                <input
                  type="file"
                  className="form-control"
                  id="luggagePhotos"
                  name="luggagePhotos"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="clientName" className="block font-semibold mb-1">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="clientName"
                  name="name"
                  value={clientDetails.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="clientEmail" className="block font-semibold mb-1">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="clientEmail"
                  name="email"
                  value={clientDetails.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="clientPhone" className="block font-semibold mb-1">Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="clientPhone"
                  name="phone"
                  value={clientDetails.phone}
                  onChange={handleInputChange}
                  required
                />
                {errors.phone && <p className="text-danger">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="specialRequests" className="block font-semibold mb-1">Special Requests:</label>
                <textarea
                  className="form-control"
                  id="specialRequests"
                  name="specialRequests"
                  value={clientDetails.specialRequests}
                  onChange={handleInputChange}
                />
                {errors.specialRequests && <p className="text-danger">{errors.specialRequests}</p>}
              </div>
              <div>
                <label htmlFor="notes" className="block font-semibold mb-1">Notes:</label>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  value={clientDetails.notes}
                  onChange={handleInputChange}
                />
                {errors.notes && <p className="text-danger">{errors.notes}</p>}
              </div>
              <div>
                <label htmlFor="luggagePhotos" className="block font-semibold mb-1">Luggage Photos (optional):</label>
                <input
                  type="file"
                  className="form-control"
                  id="luggagePhotos"
                  name="luggagePhotos"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserDetailsModal;