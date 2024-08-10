import React, { useEffect, useState } from 'react';
import { fetchAllStudies } from '../../services/StudiesService';
import EditSection from './EditSection';
import AddSection from './AddSection';
export const LayoutStudies = () => {
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedAdd, setSelectedAdd] = useState(null);
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
  // open menu to edit function - save study
  const OpenEdit = (studies, id) => {
    setEdit(true);
    setSelected(studies);
  };
  // close menu to edit function
  const CloseEdit = () => {
    setEdit(false);
  };

  const OpenAdd = () => {
    setAdd(true);
    // setSelected(studies);
  };
  const CloseAdd = () => {
    setAdd(false);
  };
  return (
    <>
      <div>
        <ul className="bg-black text-gray-400 p-14 my-12 m-8 flex flex-col rounded-full gap-3 ">
          {studies.map((studies) => (
            <li key={studies._id} className="">
              {studies.titulo}, {studies.institucion}, ({studies.anio}),
              <button
                className="m-2"
                onClick={() => OpenEdit(studies, studies._id)}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
        <button className="text-yellow-100" onClick={OpenAdd}>
          Agregar
        </button>
      </div>
      <div>
        {add && (
          <AddSection
            // select={selectedAdd}
            onClose={CloseAdd}
          ></AddSection>
        )}
      </div>
      <div>
        {edit && (
          <EditSection select={selected} onClose={CloseEdit}></EditSection>
        )}
      </div>
    </>
  );
};

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
