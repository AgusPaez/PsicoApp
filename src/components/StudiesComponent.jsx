import React, { useEffect, useState } from 'react';
//imports
import { fetchAllStudies } from '../services/StudiesService';
import axios from 'axios';

export const StudiesComponent = () => {
  //state use for studies
  const [studies, setStudies] = useState([]);
  //fetch studies
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        // call service
        const studies = await fetchAllStudies();
        // update studies
        setStudies(studies);
      } catch (error) {
        console.error('Error fetching studies', error);
      }
    };
    fetchStudies();
  }, []);
  console.log(studies); //para corroborar resultados luego BORRAR
  return (
    <>
      <div>
        <h1>Lista de Estudios</h1>
        <ul>
          {studies.map((study) => (
            <li key={study._id}>
              <strong>Título:</strong> {study.titulo}
              <br />
              <strong>Institución:</strong> {study.institucion}
              <br />
              <strong>Año:</strong> {study.anio}
              <br />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
