import React, { useState } from 'react';
import { User, Mail, Lock, EyeOff, Eye } from 'lucide-react';
import {useNavigate} from "react-router-dom"
const Profile = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });
  const [passwordError, setPasswordError] = useState('');

  // Mock user data - replace with actual user context/state
//   const user = {
//     username: 'johndoe',
//     email: 'john.doe@example.com'
//   };
const [email,setEmail]=useState("")
const [username,setUsername]=useState("")

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const API_URL = import.meta.env.VITE_API_URL;
  const getCurrentUser= async()=>{
    try {
        const response = await fetch(`${API_URL}/api/users/current-user`, {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword:passwordFormData.oldPassword,
                newPassword:passwordFormData.newPassword
            }),
        });

        if (!response.ok) {
           
            setPasswordError('Couldnt get current user');
            return;
        }

        const data = await response.json();
        console.log(data);
        setEmail(data.data.email)
        setUsername(data.data.username)
        if (data.statusCode == 200) {
            console.log('Got Current user successful');
            // setIsAuthenticated(false);
            
            // alert('Password Changed successful');
            // navigate('/profile');
        } else {
            setPasswordError('Please check your username and password');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        setPasswordError('An error occurred. Please try again.');
    }
  }
getCurrentUser()
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmitPasswordChange = async(e) => {
    e.preventDefault();
    setPasswordError('');

    // Basic validation
    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordFormData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    // Here you would typically call an API to change the password
    try {
        const response = await fetch(`${API_URL}/api/users/change-pass`, {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword:passwordFormData.oldPassword,
                newPassword:passwordFormData.newPassword
            }),
        });

        if (!response.ok) {
           
            setPasswordError('Please check your  password');
            return;
        }

        const data = await response.json();
        console.log(data);

        if (data.statusCode == 200) {
            console.log('Password Changed successful');
            // setIsAuthenticated(false);
            
            alert('Password Changed successful');
            navigate('/profile');
        } else {
            setPasswordError('Please check your username and password');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        setPasswordError('An error occurred. Please try again.');
    }
    
    // Reset form and close modal on successful change
    setPasswordFormData({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    setIsPasswordModalOpen(false);
  };

  return (
    <div className='h-[100vh] bg-blue-950 flex flex-col justify-center'>

    <div className="bg-gray-900 shadow-md rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <div className="bg-blue-950 text-white rounded-full w-16 h-16 flex items-center justify-center mr-4">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-100">{username}</h2>
          <p className="text-gray-600 flex items-center">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            {email}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <button 
          onClick={() => setIsPasswordModalOpen(true)}
          className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
          <Lock className="w-5 h-5" />
          Change Password
        </button>
      </div>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-950 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-100">Change Password</h3>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
                >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitPasswordChange}>
              <div className="mb-4">
                <label className="block text-gray-100 mb-2">Old Password</label>
                <div className="relative">
                  <input
                    type={passwordVisibility.oldPassword ? 'text' : 'password'}
                    name="oldPassword"
                    value={passwordFormData.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter old password"
                    required
                    />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('oldPassword')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                    {passwordVisibility.oldPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-100 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={passwordVisibility.newPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordFormData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter new password"
                    required
                    />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('newPassword')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                    {passwordVisibility.newPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-100 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={passwordVisibility.confirmNewPassword ? 'text' : 'password'}
                    name="confirmNewPassword"
                    value={passwordFormData.confirmNewPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Confirm new password"
                    required
                    />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirmNewPassword')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                    {passwordVisibility.confirmNewPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                  <div className="mb-4 text-red-600 text-sm">
                  {passwordError}
                </div>
              )}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900"
                  >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
      </div>
  );
};

export default Profile;