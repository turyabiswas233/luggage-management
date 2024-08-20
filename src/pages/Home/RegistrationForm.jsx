import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const RegistrationForm = ({ loginType, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    businessAddress: {
      street: '',
      district: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Australia',
    },
    tradeLicenseNumber: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Add state to track success
  const [loading, setLoading] = useState(false); // Add state to track loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('businessAddress')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        businessAddress: {
          ...prevData.businessAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (loginType === 'Partner') {
      if (!formData.businessAddress.street) newErrors.street = 'Street is required';
      if (!formData.businessAddress.district) newErrors.district = 'Suburb is required';
      if (!formData.businessAddress.city) newErrors.city = 'City is required';
      if (!formData.businessAddress.state) newErrors.state = 'State is required';
      if (!formData.businessAddress.zipCode) newErrors.zipCode = 'Post Code is required';
      if (!formData.tradeLicenseNumber) newErrors.tradeLicenseNumber = 'ABN number is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true); // Start loading

    const endpoint = loginType === 'Partner'
      ? `${config.API_BASE_URL}/api/v1/users/register/partner`
      : `${config.API_BASE_URL}/api/v1/users/register/client`;

    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      ...(loginType === 'Partner' && {
        businessAddress: formData.businessAddress,
        tradeLicenseNumber: formData.tradeLicenseNumber,
      }),
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Success:', result);
        setIsSuccess(true); // Set success state to true
        setResponseMessage('Registration successful!'); // Set success message
      } else {
        console.error('Error:', result);
        setErrors({ ...errors, ...result });
        setResponseMessage(result.error); // Set failure message
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again later.' });
      setResponseMessage('An unexpected error occurred. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleOkClick = () => {
    navigate('/logout'); // Redirect to logout page
  };

  if (!loginType) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="text-center mb-6 text-4xl font-semibold text-[#4A686A]">{`Register as ${loginType}`}</h2>
        {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}
        {responseMessage && (
          <p className={`text-center mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {responseMessage}
          </p>
        )}
        {isSuccess && (
          <div className="text-center mb-4">
            <button
              onClick={handleOkClick}
              className="bg-[#4A686A] hover:bg-[#518689] text-white py-2 px-4 rounded transition duration-200"
            >
              OK
            </button>
          </div>
        )}
        {!isSuccess && loginType === 'Partner' && (
          <>
            {currentStep === 1 && (
              <form>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <span className="text-red-500">{errors.username}</span>}
                  {errors.error && errors.error.includes('Username') && <span className="text-red-500">{errors.error}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="text-red-500">{errors.email}</span>}
                  {errors.error && errors.error.includes('Email') && <span className="text-red-500">{errors.error}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="text-red-500">{errors.password}</span>}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 px-4 rounded transition duration-200"
                    type="button"
                    onClick={() => setCurrentStep(2)}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {currentStep === 2 && (
              <form>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="businessAddress.street">Street</label>
                  <input
                    type="text"
                    id="businessAddress.street"
                    name="businessAddress.street"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.businessAddress.street}
                    onChange={handleChange}
                  />
                  {errors.street && <span className="text-red-500">{errors.street}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="businessAddress.district">Suburb</label>
                  <input
                    type="text"
                    id="businessAddress.district"
                    name="businessAddress.district"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.businessAddress.district}
                    onChange={handleChange}
                  />
                  {errors.district && <span className="text-red-500">{errors.district}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="businessAddress.city">City</label>
                  <input
                    type="text"
                    id="businessAddress.city"
                    name="businessAddress.city"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.businessAddress.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span className="text-red-500">{errors.city}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="businessAddress.state">State</label>
                  <input
                    type="text"
                    id="businessAddress.state"
                    name="businessAddress.state"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.businessAddress.state}
                    onChange={handleChange}
                  />
                  {errors.state && <span className="text-red-500">{errors.state}</span>}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 mx-3 px-4 rounded transition duration-200"
                    type="button"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </button>
                  <button
                    className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 mx-3 px-4 rounded transition duration-200"
                    type="button"
                    onClick={() => setCurrentStep(3)}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {currentStep === 3 && (
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="businessAddress.zipCode">Post Code</label>
                  <input
                    type="text"
                    id="businessAddress.zipCode"
                    name="businessAddress.zipCode"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.businessAddress.zipCode}
                    onChange={handleChange}
                  />
                  {errors.zipCode && <span className="text-red-500">{errors.zipCode}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="businessAddress.country">Country</label>
                  <input
                    type="text"
                    id="businessAddress.country"
                    name="businessAddress.country"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.businessAddress.country}
                    onChange={handleChange}
                  />
                  {errors.country && <span className="text-red-500">{errors.country}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="tradeLicenseNumber">ABN Number</label>
                  <input
                    type="text"
                    id="tradeLicenseNumber"
                    name="tradeLicenseNumber"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.tradeLicenseNumber}
                    onChange={handleChange}
                  />
                  {errors.tradeLicenseNumber && <span className="text-red-500">{errors.tradeLicenseNumber}</span>}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 mx-3 px-4 rounded transition duration-200"
                    type="button"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </button>
                  <button
                    className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 mx-3 px-4 rounded transition duration-200"
                    type="submit"
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
        {!isSuccess && loginType !== 'Partner' && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-[#4A686A] font-medium" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="text-red-500">{errors.username}</span>}
              {errors.error && errors.error.includes('Username') && <span className="text-red-500">{errors.error}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-[#4A686A] font-medium" htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
              {errors.error && errors.error.includes('Email') && <span className="text-red-500">{errors.error}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-[#4A686A] font-medium" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>
            <div className="flex justify-center items-center mb-4">
              <button
                className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 px-4 rounded transition duration-200"
                type="submit"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
