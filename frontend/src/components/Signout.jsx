import React, { useState } from 'react';
import { Mail, Lock, AlertTriangle } from 'lucide-react';
import {useNavigate} from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext';
const SignOut = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { setUser } = useAuthContext()
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!password) {
      setError('Please enter password');
      return;
    }

    try {
        const response = await fetch(`${API_URL}/api/users/logout`, {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password
            }),
        });

        if (!response.ok) {
           
            setError('Please check your  password');
            return;
        }

        const data = await response.json();
        console.log(data);

        if (data.statusCode == 200) {
            console.log('Logout successful');
            
            setUser(null)
            alert('Logout successful');
            navigate('/login');
        } else {
            setError('Please check your username and password');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 shadow-md rounded-lg w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Sign Out Confirmation</h2>
          <p className="text-gray-400">Please confirm your credentials to sign out</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-100 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="mr-2 w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-3 rounded-lg hover:bg-blue-900 transition-colors"
            >
              Confirm Sign Out
            </button>

            <button
              type="button"
              onClick={()=>{navigate('/')}}
              className="w-full border border-gray-300 text-gray-100 py-3 rounded-lg hover:bg-blue-950 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignOut;