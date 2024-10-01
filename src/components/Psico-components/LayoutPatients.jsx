//imports
import React, { useEffect, useState } from 'react';
//import Icons
import { PatientsICON } from '../../assets/icons/PatientsICON';
//import components
import { EditPatients } from './EditPatients';
import { AddPatientModal } from './AddPatientModal';
import { AddPatient } from './AddPatient';
//import services
import { findPatients, deleteProfile } from '../../services/users';

export const LayoutPatients = () => {
  //states
  const [patients, setpatients] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        //call service
        const response = await findPatients();
        setpatients(response);
      } catch (error) {}
    };
    fetchPatients();
  }, []);
  //delete patient function
  const deleted = async (id) => {
    try {
      await deleteProfile(id);
      console.log('user eliminado');
      //refresh the patients list after deletion
      //setPatients(patients.filter(patient => patient._id !== id));
    } catch (error) {
      console.log('erro al tratar de elimnar el user');
    }
    console.log(id);
  };
  // function to open edit modal
  const OpenEdit = (id) => {
    setOpenEdit(!openEdit);
    setSelected(id);
  };

  // function to open add modal
  const OpenAdd = () => {
    setOpenAdd(!openAdd);
  };

  return (
    <>
      <section className="flex flex-col w-5/6 p-5 m-5 ml-10 border border-blue-500 rounded-xl">
        <div className="flex items-center justify-center gap-4 p-2 m-4 text-white ">
          <PatientsICON h={40} w={40} color={'#edf0ea'} />
          <h2 className="font-semibold text-black ">
            EDICION SECCION: PACIENTES
          </h2>
          <PatientsICON h={40} w={40} color={'#edf0ea'} />
        </div>
        <div className="overflow-y-auto h-5/6 scrollbar scrollbar-thumb-blue-500 scrollbar-track-slate-600">
          <table className="min-w-full overflow-hidden text-gray-300 bg-gray-800 rounded-md shadow-lg table-auto bg-opacity-30">
            <thead className="">
              <tr className="text-sm font-semibold tracking-wide text-gray-200 uppercase bg-gray-700 bg-opacity-40">
                <th className="px-2 py-3 text-left">Nombre</th>
                <th className="px-2 py-3 text-left">Apellido</th>
                <th className="px-2 py-3 text-left"> D.N.I. </th>
                <th className="px-2 py-3 text-left">Email</th>
                <th className="px-2 py-3 text-left">Número</th>
                {/* <th className="px-2 py-3 text-left">Fecha Nacimiento</th> */}
                <th className="px-2 py-3 text-left">O.S</th>

                {/* <th className="px-2 py-3 text-left">Creada</th> */}
                {/* <th className="px-2 py-3 text-left">Acciones</th> */}
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-200 cursor-pointer odd:bg-gray-800 odd:bg-opacity-40 hover:bg-gray-700 "
                  onClick={() => OpenEdit(patient)}
                >
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.nombre}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.apellido}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.dni}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.email}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.numero}
                  </td>
                  {/* <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.fecha_nacimiento.substring(0, 10)}
                  </td> */}
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.obra_social}
                  </td>
                  {/* <td className="px-2 py-2 text-sm border-b border-gray-700">
                  {patient.createdAt.substring(0, 10)}
                </td> */}
                  {/* <td className="px-2 py-2 text-center border-b border-gray-700">
                  <button
                    onClick={() => OpenEdit(patient)}
                    className="px-2 py-1 text-xs text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-500"
                  >
                    Editar
                  </button>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section>
          <div className="flex w-full my-4">
            <button
              className="text-center py-1 px-2 mx-auto text-[#0084f0] hover:font-semibold hover:text-[#64b9ff] animate-pulse ease-in-out transition-all duration-500 hover:tracking-widest hover:scale-110"
              onClick={OpenAdd}
            >
              AGREGAR PACIENTE
            </button>
          </div>
          {/* <div>{openAdd && <AddPatient close={OpenAdd} />}</div> */}
        </section>
      </section>
      <div>
        {openAdd && <AddPatientModal onClose={OpenAdd} admin={true} />}
        {openEdit && (
          <EditPatients
            close={OpenEdit}
            deleted={deleted}
            selected={selected}
          />
        )}
      </div>
    </>
  );
};
