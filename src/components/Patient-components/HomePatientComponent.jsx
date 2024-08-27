// imports
import React from 'react';
//import context
import { useAuth } from '../../context/AuthProvider';

export const HomePatientComponent = () => {
  //context
  const { login, isAuthenticated, user, logout, dataLogin } = useAuth();
  return (
    <>
      <div>
        HomePatient
        <div>
          datos de la sesion iniciada "paciente"
          <div>
            <h1>
              NOMBRE: {dataLogin.nombre}, {dataLogin.apellido}
            </h1>
            <h1>EMAIL ASOCIADO : {dataLogin.email}</h1>
            <h1>
              {' '}
              Cuenta registrada el : {dataLogin.createdAt.substring(0, 10)}
            </h1>
            <h1></h1>
          </div>
        </div>
        {/* <button onClick={logout}>SALIR</button> */}
      </div>
    </>
  );
};
