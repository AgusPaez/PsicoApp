import React from 'react';
import { useAuth } from '../../context/AuthProvider';
export const HomePatient = () => {
  const { login, isAuthenticated, user, logout, dataLogin } = useAuth();
  console.log(dataLogin);
  return (
    <div>
      HomePatient
      <div>
        datos de la sesion iniciada "paciente"
        <div>
          <h1>
            NOMBRE: {dataLogin.nombre}, {dataLogin.apellido}
          </h1>
          <h1>EMAIL ASOCIADO : {dataLogin.email}</h1>
          <h1> Cuenta registrada el : {dataLogin.createdAt}</h1>
          <h1></h1>
        </div>
      </div>
      <button onClick={logout}>SALIR</button>
    </div>
  );
};
