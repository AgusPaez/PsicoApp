import React, { useEffect, useState } from 'react';
import { fetchAllStudies } from '../../services/StudiesService';
export const LayoutStudies = () => {
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
  console.log(studies); //para corroborar resultados

  const OpenEdit = (studies) => {
    console.log(studies);
  };

  return (
    // <form className="bg-black text-gray-400 p-5 my-12 m-8 flex flex-col justify-center rounded-full  ">
    //   <label className="flex flex-col" htmlFor="">
    //     Nombre del/la Psicologo/a
    //   </label>
    //   <input></input>
    //   <label className="flex flex-col" htmlFor="">
    //     Formacion
    //   </label>

    //   <label className="flex flex-col" htmlFor="">
    //     Imagenes
    //   </label>
    //   <input></input>
    // </form>
    <>
      <ul className="bg-black text-gray-400 p-14 my-12 m-8 flex flex-col rounded-full gap-3 ">
        {studies.map((studies) => (
          <li key={studies._id} className="">
            {' '}
            {studies.titulo}, {studies.institucion}, ({studies.anio}),
            <button onClick={() => OpenEdit(studies)}>Editar</button>
            <button>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
};
