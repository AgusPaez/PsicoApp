import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  // Inicialización de estados similares al primer código
  const [dataLogin, setDataLogin] = useState(
    JSON.parse(localStorage.getItem('dataLogin')) || {}
  );
  const [isLogin, setIsLogin] = useState(dataLogin?.userLogin || false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Sincronización con localStorage
  useEffect(() => {
    if (!dataLogin || !dataLogin.userLogin) {
      console.error('No hay datos de login');
    } else {
      localStorage.setItem('dataLogin', JSON.stringify(dataLogin));
    }
  }, [dataLogin]);

  // Función login
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      if (response.status) {
        const userData = { ...response.data, userLogin: true };
        localStorage.setItem('dataLogin', JSON.stringify(userData));
        setDataLogin(userData);
        setIsLogin(true);
        navigate('/HomePsico'); // Ajusta la redirección según el rol del usuario si es necesario
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Función logout
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
        isLogin,
        setIsLogin,
        dataLogin,
        showModal,
        setShowModal,
        logout,
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
