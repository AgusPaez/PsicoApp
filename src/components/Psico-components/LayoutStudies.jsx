//imports
import React, { useEffect, useState } from 'react';
//import icons
import { StudyICON } from '../../assets/icons/StudyICON';
//import components
import EditSection from './EditSection';
import AddSection from './AddSection';
// import services
import { fetchAllStudies } from '../../services/StudiesService';

export const LayoutStudies = () => {
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
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
    setSelectedId(id);
  };
  // close menu to edit function
  const CloseEdit = () => {
    setEdit(false);
    setSelectedId(null);
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
      <section className="flex flex-col w-11/12 min-h-[80vh] p-3 mx-auto mt-5 border border-blue-500 md:h-auto md:w-5/6 md:p-5 md:m-5 md:ml-10 rounded-xl">
        <div className="w-full text-center ">
          <div className="flex items-center justify-center gap-4 p-2 m-4">
            <StudyICON h={35} w={35} color={'#edf0ea'} />
            <h1 className="font-semibold"> EDICION SECCION: ESTUDIOS</h1>{' '}
            <StudyICON h={35} w={35} color={'#edf0ea'} />
          </div>
        </div>
        <ul className="flex flex-col gap-3 mx-8 mt-10 text-center text-gray-400 ">
          {studies.map((studies) => (
            <div key={studies._id} className="relative mx-auto group">
              <li
                onClick={() => OpenEdit(studies, studies._id)}
                className={`${
                  selectedId === studies._id
                    ? 'scale-110 after:scale-x-100 tracking-wider'
                    : 'hover:scale-110 hover:after:scale-x-100 '
                } relative group inline-block transition-all duration-700 hover:tracking-wider hover:cursor-pointer text-gray-900 after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-500 after:origin-bottom-right after:transition-transform after:duration-700 hover:after:origin-bottom-left`}
              >
                {studies.titulo}, {studies.institucion} ({studies.anio})
              </li>
              <button
                className={`${
                  selectedId === studies._id
                    ? 'group-hover:opacity-100'
                    : 'opacity-0'
                } absolute pl-8 text-blue-500 transition-opacity duration-1000 group-hover:opacity-100 `}
                onClick={() => OpenEdit(studies, studies._id)}
              >
                Editar
              </button>
            </div>
          ))}
          <button
            className="text-center py-1 px-2 mx-auto text-[#0084f0] hover:font-semibold hover:text-[#64b9ff] animate-pulse ease-in-out transition-all duration-500 hover:tracking-widest hover:scale-110"
            onClick={OpenAdd}
          >
            AÑADIR
          </button>
        </ul>
      </section>

      {add && (
        <AddSection
          // select={selectedAdd}
          onClose={CloseAdd}
        ></AddSection>
      )}

      {edit && (
        <EditSection select={selected} onClose={CloseEdit}></EditSection>
      )}
    </>
  );
};
