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
import { Group } from './Group';
import { findAll } from '../../services/bond';

export const LayoutPatients = () => {
  //states
  const [patients, setpatients] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [addGroups, setaddGroups] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Llamadas a los servicios
        const response = await findPatients();
        const response2 = await findAll();

        // Procesar datos
        const processedPatients = processPatientsData(response, response2);
        const processedBonds = processBondsData(response2, response);

        setpatients(processedPatients);
        setBonds(processedBonds);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
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
  // function to open add group
  const AddGroup = () => {
    setaddGroups(!addGroups);
  };
  const processBondsData = (bonds, users) => {
    // Crear un mapa para buscar usuarios rápidamente por su ID, concatenando nombre y apellido
    const userMap = new Map(
      users.map((user) => [user._id, `${user.nombre} ${user.apellido}`])
    );

    // Transformar los datos de bonds
    return bonds.map((bond) => ({
      ...bond,
      titular: userMap.get(bond.titular),
      pareja: userMap.get(bond.pareja) || 'No asignado',
      hijos: [
        userMap.get(bond.hijo_1),
        userMap.get(bond.hijo_2),
        userMap.get(bond.hijo_3),
        userMap.get(bond.hijo_4),
        userMap.get(bond.hijo_5),
      ].filter(Boolean),
    }));
  };

  const processPatientsData = (patients, bonds) => {
    const bondUserIds = new Set(
      bonds.flatMap((bond) => [
        bond.pareja,
        bond.hijo_1,
        bond.hijo_2,
        bond.hijo_3,
        bond.hijo_4,
        bond.hijo_5,
      ])
    );

    return patients.map((patient) => ({
      ...patient,
      perteneceGrupoFamiliar: bondUserIds.has(patient._id),
    }));
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
                <th className="px-2 py-3 text-left">O.S</th>
                <th className="px-2 py-3 text-left">Grupo Familiar</th>
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
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.obra_social}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {patient.perteneceGrupoFamiliar ? 'Sí' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center gap-4 p-2 m-4 text-white ">
          <PatientsICON h={40} w={40} color={'#edf0ea'} />
          <h2 className="font-semibold text-black ">
            EDICION SECCION: GRUPO FAMILIAR
          </h2>
          <PatientsICON h={40} w={40} color={'#edf0ea'} />
        </div>
        <div className="overflow-y-auto h-5/6 scrollbar scrollbar-thumb-blue-500 scrollbar-track-slate-600">
          <table className="min-w-full overflow-hidden text-gray-300 bg-gray-800 rounded-md shadow-lg table-auto bg-opacity-30">
            <thead>
              <tr className="text-sm font-semibold tracking-wide text-gray-200 uppercase bg-gray-700 bg-opacity-40">
                <th className="px-2 py-3 text-left">Nombre</th>
                <th className="px-2 py-3 text-left">Tipo</th>
                <th className="px-2 py-3 text-left">Titular</th>
                <th className="px-2 py-3 text-left">Pareja</th>
                <th className="px-2 py-3 text-left">Hijos</th>
              </tr>
            </thead>
            <tbody>
              {bonds.map((bond, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-200 cursor-pointer odd:bg-gray-800 odd:bg-opacity-40 hover:bg-gray-700"
                >
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {bond.nombre_vinculo || 'Sin nombre'}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {bond.tipo || 'Sin tipo'}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {bond.titular}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {bond.pareja || 'No asignada'}
                  </td>
                  <td className="px-2 py-2 text-sm border-b border-gray-700">
                    {bond.hijos.join(', ') || 'Sin hijos'}
                  </td>
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
            <button
              className="text-center py-1 px-2 mx-auto text-[#0084f0] hover:font-semibold hover:text-[#64b9ff] animate-pulse ease-in-out transition-all duration-500 hover:tracking-widest hover:scale-110"
              onClick={AddGroup}
            >
              CREAR GRUPO FAMILIAR
            </button>
          </div>
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
        {addGroups && <Group onClose={AddGroup} />}
      </div>
    </>
  );
};
