import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
