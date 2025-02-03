import { createContext, useReducer, useEffect } from 'react';
// import Cookies from 'js-cookie'; // Assuming you've installed the js-cookie library

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { user: action.payload }
      case 'LOGOUT':
        return { user: null }
      default:
        return state
    }
  }

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    
  });

  useEffect(() => {

    async function verifyJwtToken()
    {

        // const accessToken = Cookies.get('accessToken');
        // const refreshToken = Cookies.get('refreshToken');
        
        // if (accessToken && refreshToken) {
            // Assuming you have a function to fetch user data from the API using access token
            try {
                // Send a request to validate the access token
                const response = await fetch('/api/auth/verifyJWT', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });
                
                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: 'LOGIN', payload: data.user });
                } else {
                    // Attempt to refresh the token
                    const refreshResponse = await fetch('/api/auth/refreshToken', {
                        method: 'POST',
                        credentials: 'include', // Include cookies
                    });
                    
                    if (refreshResponse.ok) {
                        const refreshData = await refreshResponse.json();
                        dispatch({ type: 'LOGIN', payload: refreshData.user });
                    } else {
                        dispatch({ type: 'LOGOUT' });
                    }
                }
            } catch (error) {
                console.error('Token validation/refresh failed:', error);
                dispatch({ type: 'LOGOUT' });
            }
        }
        verifyJwtToken();
//   }
  }, []);

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
};