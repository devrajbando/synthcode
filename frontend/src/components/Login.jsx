import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import AnimatedContent from "./ui/AnimateContent";
import { Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
export default function Login() {
 
  const [email, setEmail] = useState('')
	const navigate = useNavigate();
	const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const clientId= import.meta.env.GOOGLE_CLIENT_ID
    const { setUser } = useAuthContext();

    async function LoginUser(event) {
        event.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
    
            if (!response.ok) {
                
                setError('Please check your username and password');
                return;
            }
    
            const data = await response.json();
            console.log(data.data.user);
    
            if (data.statusCode == 200) {
                console.log('Login successful');
                
                setUser(data.data.user)
                alert('Login successful');

                navigate('/');
            } else {
                setError('Please check your username and password');
            }
        } catch (error) {
            console.error('Error during login:', error)
            setError('An error occurred. Please try again.');
        }
    }

    const onSuccess=(res)=>{
      console.log('Login successful');
      console.log(res)
                console.log(res.profileObj)
                // setUser(res.profileObj)
                const decoded = jwtDecode(res.credential);
                console.log("Decoded User:", decoded);
                console.log(decoded.email)
                console.log(decoded.name)
                alert('Login successful');
                // setUser(decoded.email); 
                setUser(decoded); 
                // setUser(decoded.name); 
                // setUser(decoded.email); 
                navigate('/');
              }
    const onFailure=(res)=>{
      console.error('Error during login:', res);
            setError('An error occurred. Please try again.');
    }

  return (
    <>
    <AnimatedContent
          distance={80}
          direction="horizontal"
          reverse={false}
          config={{ tension: 50, friction: 25 }}
          initialOpacity={0.2}
          animateOpacity
          scale={1.2}
          threshold={0.2}
        >
    <div className="min-h-screen flex items-center justify-center bg-blue-950 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-100">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={LoginUser}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  />
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-end">
            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Sign in
          </button>
          <div>
            <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            isSignedIn={true}
            />

           

          
          </div>
        </form>
      </div>
    </div>
            </AnimatedContent>
    </>
  );
};


