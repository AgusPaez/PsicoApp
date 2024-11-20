//imports
import React, { useEffect, useState } from 'react';
//import components
import { PatientsCard } from './PatientsCard';
import { PatientsList } from './PatientsList';
import { AddPatientModal } from './AddPatientModal';
//import services
import { findPatients } from '../../services/users';

export const PatientsComponent = () => {
  //states
  const [render, setRender] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);

  // open/close modal function
  const openmodal = () => {
    setModal(!modal);
  };

  //fetch patients
  useEffect(() => {
    //call service
    const fetchPatients = async () => {
      try {
        const data = await findPatients();
        setPatients(data);
      } catch (error) {
        console.log('Error fetch patients', error);
      }
    };
    fetchPatients();
  }, []);

  //changue render ( List - Cards )
  const changueRender = () => {
    setRender(!render);
  };

  //fill(search) patients function
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.nombre} ${patient.apellido}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="p-1.5 pt-3 m-1.5 mt-3 md:p-4 md:m-4">
        {/* Buscador */}
        <div className="grid w-full md:flex md:pl-4 md:ml-4">
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="order-2 w-full p-2 mb-2 border border-gray-400 rounded-lg md:mb-4 md:order-1 md:w-[29.5%]"
          />
          <button
            onClick={openmodal}
            className="md:ml-8 hover:scale-105 order-1 md:order-2 md:w-1/6 w-full px-4 py-2 mb-5 md:mb-4  text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:tracking-wide "
          >
            Agregar Paciente
          </button>

          <div className="absolute hidden gap-4 md:inline-flex top-28 right-56">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6em"
              height="1.6em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.048 2.488a.75.75 0 0 1-.036 1.06l-4.286 4a.75.75 0 0 1-1.095-.076l-1.214-1.5a.75.75 0 0 1 1.166-.944l.708.875l3.697-3.451a.75.75 0 0 1 1.06.036M11.25 5a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M8.048 9.488a.75.75 0 0 1-.036 1.06l-4.286 4a.75.75 0 0 1-1.095-.076l-1.214-1.5a.75.75 0 1 1 1.166-.944l.708.875l3.697-3.451a.75.75 0 0 1 1.06.036M11.25 12a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75m-3.202 4.488a.75.75 0 0 1-.036 1.06l-4.286 4a.75.75 0 0 1-1.095-.076l-1.214-1.5a.75.75 0 1 1 1.166-.944l.708.875l3.697-3.451a.75.75 0 0 1 1.06.036M11.25 19a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75"
                clipRule="evenodd"
              />
            </svg>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onClick={changueRender}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#7d65bf]"></div>
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6em"
              height="1.6em"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M4.083 14H14V4.083H4.083zM17 4.083V14h9.917V4.083zm0 22.834h9.917V17H17zm-12.917 0H14V17H4.083z"
              />
            </svg>
          </div>
        </div>
        {render ? (
          <PatientsCard patients={filteredPatients} />
        ) : (
          <PatientsList patients={filteredPatients} />
        )}
        {modal && <AddPatientModal onClose={openmodal} />}
      </div>
    </>
  );
};
