import { createContext, useReducer, useEffect,useState } from 'react';


export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const verifyJwtToken=async()=>
  {

      
          try {
              
              const response = await fetch('http://localhost:8000/api/users/verify', {
                  method: 'GET',
                  credentials: 'include', // Include cookies in the request
              });
              
              if (response.ok) {
                  const data = await response.json();
                  console.log(data.user)
                  setUser(data.user);
              } 
           
          } catch (error) {
            setUser(null);
              console.error('Token validation/refresh failed:', error);
            
          }
          finally {
            setLoading(false); // ✅ Ensure loading stops after fetch completes
          }
      }
  useEffect(() => {

        verifyJwtToken();
//   }
  }, []);

  
  console.log("devraj")
  console.log(user,"hiop")
  return (
    <AuthContext.Provider value={{user,setUser,loading }}>
      { children }
    </AuthContext.Provider>
  )
};

