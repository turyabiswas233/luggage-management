import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import config from '../../config';
import RegistrationForm from './RegistrationForm';
import { FaSpinner } from 'react-icons/fa';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = ({ loginType, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true); // Set loading to true when form is submitted
    const endpoint = loginType === 'Partner'
      ? `${config.API_BASE_URL}/api/v1/users/login/partner`
      : `${config.API_BASE_URL}/api/v1/users/login/client`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Success:', result);
        localStorage.setItem('token', result.token); // Store the token in local storage
        localStorage.setItem('loginTime', new Date().getTime().toString());
        if (loginType === 'Partner') {
          navigate('/partner/profile'); // Redirect to partner profile
        } else {
          navigate('/client/home'); // Redirect to client profile
        }
      } else {
        setErrorMessage(result.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false when request is complete
    }
  };

  const handleForgotPasswordSubmit = async (data) => {
    setIsLoading(true); // Set loading to true when form is submitted
    const endpoint = `${config.API_BASE_URL}/api/v1/users/reset-password`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Success:', result);
        navigate('/'); // Redirect to home page
      } else {
        setErrorMessage(result.message || 'Password reset failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false when request is complete
    }
  };

  if (!loginType) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        {showForgotPassword ? (
          <>
            <h2 className="text-center mb-4 text-3xl font-bold text-blue-700">Forgot Password</h2>
            <form onSubmit={handleSubmit(handleForgotPasswordSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <button className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105" type="submit">
                  {isLoading ? <FaSpinner className="animate-spin" /> : 'Reset Password'}
                </button>
              </div>
            </form>
            {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
            <div className="text-center">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </div>
          </>
        ) : (
          isLogin ? (
            <>
              <h2 className="text-center mb-4 text-3xl font-bold text-[#4A686A]">{`Login as ${loginType}`}</h2>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#518689]"
                  />
                  {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#518689]"
                  />
                  {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                  <button className="w-full bg-[#518689] hover:bg-[#4A686A] text-white py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105" type="submit">
                    {isLoading ? <FaSpinner className="animate-spin" /> : 'Log in'}
                  </button>
                </div>
              </form>
              {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
              <div className="text-center">
                <button
                  className="text-[#4A686A] hover:underline me-4"
                  onClick={() => setIsLogin(false)}
                >
                  Need an account? Register
                </button>
                <button
                  className="text-[#4A686A] hover:underline"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <RegistrationForm loginType={loginType} onClose={onClose} />
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
