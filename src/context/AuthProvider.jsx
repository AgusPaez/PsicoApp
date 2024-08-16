import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

// variables
const baseUrl = import.meta.env.VITE_API_URL;
const urlLogin = 'auth/login';
const urlRegister = 'auth/signUp';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  //console.log('CONTEXT component rendered');
  const [dataLogin, setDataLogin] = useState(
    JSON.parse(localStorage.getItem('dataLogin')) || {}
  );
  const [isLogin, setIsLogin] = useState(dataLogin?.userLogin || false);
  const navigate = useNavigate();

  // Sinc with localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('dataLogin'));
    if (storedData && storedData !== dataLogin) {
      localStorage.setItem('dataLogin', JSON.stringify(dataLogin));
    }
  }, [dataLogin]);

  // useEffect(() => {
  //   if (!dataLogin || !dataLogin.userLogin) {
  //     console.error('No hay datos de login');
  //   } else {
  //     localStorage.setItem('dataLogin', JSON.stringify(dataLogin));
  //   }
  // }, [dataLogin]);

  // login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}${urlLogin}`, {
        email,
        password,
      });
      if (response.status) {
        const userData = { ...response.data, userLogin: true };
        localStorage.setItem('dataLogin', JSON.stringify(userData));
        setDataLogin(userData);
        setIsLogin(true);

        // redirect
        switch (userData.rol) {
          case 'psicologo':
            navigate('/HomePsico');
            break;
          case 'paciente':
            navigate('/HomePatient');
            break;
        }
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // logOut function
  const logout = () => {
    localStorage.removeItem('dataLogin');
    setDataLogin({ userLogin: false });
    setIsLogin(false);
    navigate('/Login');
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLogin,
        setIsLogin,
        dataLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
