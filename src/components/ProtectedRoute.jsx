import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const ProtectedRoute = ({ children, role }) => {
  const { isLogin, dataLogin } = useAuth();
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/Login" state={{ from: location }} />;
  }

  if (role && dataLogin?.rol !== role) {
    return <Navigate to="/Login" state={{ from: location }} />;
  }

  return children;
};
