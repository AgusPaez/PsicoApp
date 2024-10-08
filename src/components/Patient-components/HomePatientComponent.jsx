//imports
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
// import videoSrc from '../../assets/videos/vecteezy_continuous-line-hand-drawn-beautiful-black-and-white-line_6554042.mp4';

export const HomePatientComponent = () => {
  // Context
  const { dataLogin, logout } = useAuth();
  const videoRef = useRef(null); // Crear una referencia para el video

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <>
      {/* Contenido principal */}
      <div className="relative z-10 flex-grow p-10 px-32">
        {/* Cabecera de bienvenida */}
        <div className="bg-[#dad4c4] bg-opacity-65 rounded-lg shadow-lg p-6 mb-8 ">
          <h1 className="text-4xl font-bold text-center mb-4 text-[#4a4a4a]">
            Bienvenido, {dataLogin.nombre} {dataLogin.apellido}
          </h1>
          <p className="text-center text-lg text-[#7a7a7a]">
            Estamos encantados de verte de nuevo. Aquí puedes gestionar tus
            citas, perfil y más.
          </p>
        </div>

        {/* Información del paciente */}
        <div className="bg-[#dad4c4] bg-opacity-70 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#4a4a4a] ">
            Información de tu cuenta
          </h2>
          <p className="mb-2 text-lg">
            <strong>Email asociado:</strong> {dataLogin.email}
          </p>
          <p className="text-lg">
            <strong>Cuenta registrada el:</strong>{' '}
            {dataLogin.createdAt.substring(0, 10)}
          </p>
          {/* <div className="flex items-center justify-center bg-transparent h-14 rounded-[100px]">
            <video
              loop
              autoPlay
              muted // Para que no reproduzca audio automáticamente
              ref={videoRef} // Asignar la referencia al video
              className="w-20 max-w-2xl rounded-[100px] shadow-lg"
              src={videoSrc}
            >
              Your browser does not support the video tag.
            </video>
          </div> */}
        </div>

        {/* Acciones y botones */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <Link
            to="/*"
            className="block bg-[#a1968d] hover:bg-[#8d7e73] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Recursos y guías
          </Link>
          <Link
            to="/*"
            className="block bg-[#a1968d] hover:bg-[#8d7e73] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Soporte técnico
          </Link>
          <Link
            to="/AboutMePatient"
            className="block bg-[#a1968d] hover:bg-[#8d7e73] text-[#f5f0e1] text-center font-semibold hover:font-extrabold py-4 px-6 rounded-lg shadow-md hover:tracking-widest transition-all duration-300"
          >
            Configuración de la cuenta
          </Link>
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
