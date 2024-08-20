import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput, Spinner } from 'flowbite-react';
import axios from 'axios';
import config from '../../config'; 

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/v1/users/login/superadmin`, {
        email,
        password,
        rememberMe,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('loginTime', new Date().getTime().toString()); // Store the login time
      console.log('Login successful', response.data);
      navigate('/superadmin/partner-analytics');
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-4">
      <form 
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Admin Login</h2>
        <div className="mb-4">
          <Label htmlFor="email" value="Email Address" className="block text-sm font-medium text-gray-700" />
          <TextInput
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password" value="Password" className="block text-sm font-medium text-gray-700" />
          <TextInput
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center mb-4">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
            Remember me
          </Label>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Button 
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </div>
  );
}

export default AdminLoginForm;
