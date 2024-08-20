import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Log the start of the logout process
        console.log('Starting logout process');

        // Remove the token from local storage or cookies
        localStorage.removeItem('token');

        // Log that the token has been removed
        console.log('Token removed from local storage');

        // Redirect to the home page
        navigate('/');

        // Log the redirection
        console.log('Redirecting to home page');
    }, [navigate]);

    return null;
};

export default Logout;
