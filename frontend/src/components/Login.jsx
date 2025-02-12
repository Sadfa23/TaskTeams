import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    login({ email, password });

    setEmail('');
    setPassword('');
    navigate('/userdashboard');

    try {
      /*
      const response = await axios.post('http://localhost:3001/api/auth/login', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json(); // Get error details from the server
        throw new Error(data.message || 'Login failed'); // Display server error or generic message
      }

      // Successful login
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the token
      // Redirect to the dashboard or protected route
      //window.location.href = '/dashboard';
       navigate('/userdashboard') // Replace with your dashboard route
       */
    } catch (err) {
      console.log(error)
      setError(err.message); // Set the error message to display
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login