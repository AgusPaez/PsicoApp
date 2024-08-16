import React from 'react';
import { useAuth } from '../../context/AuthProvider';
export const HomePatient = () => {
  const { login, isAuthenticated, user, logout } = useAuth();
  return (
    <div>
      HomePatient
      <button onClick={logout}>SALIR</button>
    </div>
  );
};
