import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuth({
          isAuthenticated: true,
          token,
          user: decodedToken,
        });
      } catch (error) {
        localStorage.removeItem('authToken'); 
        setAuth({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      }
    } else {
      setAuth({
        isAuthenticated: false,
        token: null,
        user: null,
      });
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    localStorage.setItem('authToken', token); 
    setAuth({
      isAuthenticated: true,
      token,
      user: decodedToken,
    });
    navigate('/painel'); 
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    navigate('/login');
  };

  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
