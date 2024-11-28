import React, { useEffect, useState } from 'react';

export const Alerts = ({
  section,
  condition,
  title,
  message,
  time,
  object,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(true);
  }, []);

  if (time > 0) {
    setTimeout(() => {
      setVisible(false);
    }, time);
  }
  const handleClose = () => {
    setVisible(false);
    onClose();
  };
  return (
    <>
      {section === 'login' && visible && (
        <div className="absolute left-0 z-50 flex items-center justify-center w-full h-auto bottom-56">
          <div className="w-11/12 sm:w-2/3 lg:w-1/2 mt-3 bg-[#eff0f3ec] rounded-md border border-gray-500 p-6 sm:p-16 py-10 flex flex-col items-center justify-center z-50">
            <div className="cartelImg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="115"
                height="115"
                viewBox="0 0 24 24"
              >
                <path
                  fill={condition === 'success' ? '#059669' : '#DC2626'}
                  d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0s4-10.3.1-14.2m-4.3 11.3L12 13.4l-2.8 2.8l-1.4-1.4l2.8-2.8l-2.8-2.8l1.4-1.4l2.8 2.8l2.8-2.8l1.4 1.4l-2.8 2.8l2.8 2.8z"
                />
              </svg>
            </div>
            <h1 className="font-bold text-xl sm:text-3xl text-center leading-8 text-[#4F575D] mt-3">
              {title}
            </h1>
            <br />
            <p className="font-light text-sm sm:text-md leading-7 text-[#4F575D] text-center">
              {message}
            </p>
          </div>
        </div>
      )}
      {section === 'appointment' && visible && (
        <div className="absolute left-0 z-50 flex items-center justify-center w-full h-auto bottom-56">
          <div className="w-11/12 sm:w-2/3 lg:w-1/2 mt-3 bg-[#eff0f3ec] rounded-md border border-gray-500 p-5 sm:p-8 py-5 flex flex-col items-center justify-center z-50">
            <div className="flex justify-end w-full">
              {' '}
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={handleClose}
                aria-label="Cerrar alerta"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <h1 className="font-bold text-xl sm:text-3xl text-center leading-8 text-[#4F575D] mt-3">
              {title}
            </h1>
            <br />
            <p className="font-light text-sm sm:text-md text-[#4F575D] ">
              {message}
            </p>
            <div className="mt-4 text-left">
              <p className="text-lg font-medium">Paciente:</p>
              <p>
                <span className="font-semibold">Nombre:</span> {object.nombre}{' '}
                {object.apellido}
                <br />
                <span className="font-semibold">Edad:</span> {object.edad} años
              </p>
              <p className="mt-2">
                <span className="font-semibold">Contacto:</span>
                <br />
                <span className="font-semibold">Email:</span> {object.email}
                <br />
                <span className="font-semibold">Número:</span> {object.numero}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Consulta:</span>
                <br />
                <span className="font-semibold">Fecha y Hora:</span>{' '}
                {new Date(
                  new Date(object.fecha_consulta).getTime() + 3 * 60 * 60 * 1000
                ).toLocaleString('es-ES', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}{' '}
                hs
                <br />
                <span className="font-semibold">Derivación:</span>{' '}
                {object.derivacion}
                <br />
                <span className="font-semibold">Motivo:</span>{' '}
                {object.motivo_consulta}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
