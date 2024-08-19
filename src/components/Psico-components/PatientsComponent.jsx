// imports
import React, { useEffect, useState } from 'react';
//imports services
import { findPatients } from '../../services/users';

export const PatientsComponent = () => {
  //states
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    //call service
    const fetchPatients = async () => {
      try {
        const data = await findPatients();
        setPatient(data);
      } catch (error) {
        console.log('Error fetch patients', error);
      }
    };
    fetchPatients();
  }, []);
  return (
    <>
      <div>
        {patient.map((patient, index) => (
          <h1 key={index}>{patient.nombre}</h1>
        ))}
      </div>
    </>
  );
};
