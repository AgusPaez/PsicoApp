//imports
import React, { useEffect, useState } from 'react';
//import components
import { PatientsCard } from './PatientsCard';
import { PatientsList } from './PatientsList';
//import services
import { findPatients } from '../../services/users';

export const PatientsComponent = () => {
  //states
  const [render, setRender] = useState(true);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className="p-4 m-4">
        {/* Buscador */}
        <div className="pl-4 ml-4">
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/6 px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          />
          <label className="relative inline-flex items-center ml-10 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onClick={changueRender}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#7d65bf]"></div>
          </label>
        </div>
        {render ? (
          <PatientsCard patients={filteredPatients} />
        ) : (
          <PatientsList patients={filteredPatients} />
        )}
      </div>
    </>
  );
};
