import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuthContext } from '../hooks/useAuthContext'

const ProtectedRoute = ({ children }) => {
  const { user,loading } = useAuthContext();
  if (loading) {
    return <div className='text-white m-50'>Loading...</div>; 
  }
  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }
  
  console.log("umm",user)
  return children;
};

export default ProtectedRoute;
