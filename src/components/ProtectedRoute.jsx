import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const ProtectedRoute = ({ children, role }) => {
  const { isLogin, dataLogin } = useAuth(); // Usamos isLogin y dataLogin del contexto modificado
  const location = useLocation();

  console.log('AUTHO?? antes:', isLogin);
  if (!isLogin) {
    return <Navigate to="/Login" state={{ from: location }} />;
  }

  console.log('USER', dataLogin);
  console.log('ROle', role);
  if (role && dataLogin?.rol !== role) {
    return <Navigate to="/Login" state={{ from: location }} />;
  }

  return children;
};
