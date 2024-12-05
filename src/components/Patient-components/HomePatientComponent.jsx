//imports
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

export const HomePatientComponent = () => {
  // Context
  const { dataLogin, logout } = useAuth();

  return (
    <>
      {/* Contenido principal */}
      <div className="relative z-10 flex-grow p-6 px-3 md:p-10 md:px-32">
        {/* Cabecera de bienvenida */}
        <div className="bg-[#dad4c4] bg-opacity-65 rounded-lg shadow-lg p-3 mb-8 md:p-6">
          <h1 className="text-xl md:text-4xl font-bold text-center mb-4 text-[#4a4a4a]">
            Bienvenido, {dataLogin.nombre} {dataLogin.apellido}
          </h1>
          <p className="text-center text-sm md:text-lg text-[#7a7a7a]">
            Estamos encantados de verte de nuevo. Aquí puedes gestionar tus
            citas, perfil y más.
          </p>
        </div>

        {/* Información del paciente */}
        <div className="bg-[#dad4c4] bg-opacity-70 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#4a4a4a] ">
            Información de tu cuenta
          </h2>
          <p className="mb-2 text-sm md:text-lg">
            <strong>Email asociado:</strong> {dataLogin.email}
          </p>
          <p className="text-sm md:text-lg">
            <strong>Cuenta registrada el:</strong>{' '}
            {dataLogin.createdAt.substring(0, 10)}
          </p>
        </div>

        {/* Acciones y botones */}
        <div className="grid grid-cols-1 gap-4 px-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Botones con enlaces */}
          <Link
            to="/AppointmentPatient"
            className="block bg-[#a1968d] hover:bg-[#8d7e73] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Ver tus citas
          </Link>
          <Link
            to="/AboutMePatient"
            className="block bg-[#a1968d] hover:bg-[#8d7e73] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Editar perfil
          </Link>
          {/* <Link
            to="/*"
            className="block bg-[#a1968d] hover:bg-[#8d7e73] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Recursos y guías
          </Link> */}
          {/* <Link
            to="/*"
            className="block bg-[#a1968d] hover:bg-[#8d7e73] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Soporte técnico
          </Link> */}
          <Link
            to="/AboutMePatient"
            className="block bg-[#a1968d] hover:bg-[#8d7e73] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Configuración de la cuenta
          </Link>
          <div></div>
          <Link
            onClick={logout}
            className="block bg-[#4a4a4a] hover:bg-[#2f2f2f] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Cerrar sesión
          </Link>
        </div>
      </div>
    </>
  );
};
