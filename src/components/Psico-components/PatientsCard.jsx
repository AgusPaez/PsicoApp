//imports
import React, { useState } from 'react';
//import components
import { InfoPatient } from './InfoPatient';

export const PatientsCard = ({ patients }) => {
  //states
  const [openInfo, setOpenInfo] = useState(false);

  const openInfoPatient = () => {
    setOpenInfo(!openInfo);
  };

  return (
    <div className="flex flex-col gap-6 p-4 m-4">
      {/* Card */}
      <div className="flex flex-wrap gap-2">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div
              key={patient._id}
              className="relative w-[19.5%] max-w-sm transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:scale-105 hover:z-10"
            >
              <div className="flex flex-col items-center p-6">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  alt={`Imagen de ${patient.nombre} ${patient.apellido}`}
                  src={patient.imagenUrl}
                />
                <h3 className="mb-1 text-xl font-medium text-gray-900">
                  {patient.nombre} {patient.apellido}
                </h3>
                <span className="text-sm text-gray-500">{patient.email}</span>
                <p className="my-4 text-center text-gray-700">
                  {patient.fecha_nacimiento.split('T')[0]}
                </p>
                <button
                  onClick={openInfoPatient}
                  className="px-4 py-2 text-sm text-white bg-[#7d65bf] rounded-lg hover:bg-[#645099] transition-all duration-300 hover:tracking-wider"
                >
                  Saber más
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No se encontraron pacientes.
          </p>
        )}
      </div>
      {openInfo && <InfoPatient />}
    </div>
  );
};
