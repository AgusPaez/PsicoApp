import React from 'react';
import { useAuth } from '../../context/AuthProvider';
export const Welcome = () => {
  const { login, isAuthenticated, user, logout } = useAuth();
  return (
    <>
      <section className="flex justify-center p-5 m-12 mt-20 text-gray-400 bg-black rounded-full ">
        ¡ Bienvenido psico !<button onClick={logout}>SALIR</button>
      </section>
    </>
  );
};
