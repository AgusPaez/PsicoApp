//imports
import React, { useState, useEffect } from 'react';
// import component
import { RightAsidePatient } from './RightAsidePatient';

export const PatientsList = ({ patients }) => {
  //states
  const [sortedPatients, setSortedPatients] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [rightAside, setRightAside] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  // Updated sortedPatients when patients changues
  useEffect(() => {
    setSortedPatients(patients);
  }, [patients]);

  // sort data function
  const sortItems = (items, key, direction) => {
    return [...items].sort((a, b) => {
      if (key === 'fecha_nacimiento') {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      }
    });
  };

  // click sort data function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = sortItems(sortedPatients, key, direction);
    setSortConfig({ key, direction });
    setSortedPatients(sortedData);
  };
  const OpenRightAside = (patient) => {
    setRightAside(!rightAside);
    setSelectedUser(patient);
    console.log(selectedUser);
  };

  return (
    <div className="p-8 overflow-x-auto">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Lista de Pacientes
      </h2>
      <table className="min-w-full bg-white border border-gray-400 rounded-lg shadow-lg table-auto">
        <thead className="bg-[#9b8197b0]">
          <tr className="text-left text-gray-700">
            <th
              className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
              onClick={() => handleSort('nombre')}
            >
              Nombre{' '}
              {sortConfig.key === 'nombre'
                ? sortConfig.direction === 'asc'
                  ? '⬆'
                  : '⬇'
                : ''}
            </th>
            <th
              className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
              onClick={() => handleSort('apellido')}
            >
              Apellido{' '}
              {sortConfig.key === 'apellido'
                ? sortConfig.direction === 'asc'
                  ? '⬆'
                  : '⬇'
                : ''}
            </th>
            <th
              className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
              onClick={() => handleSort('email')}
            >
              Email{' '}
              {sortConfig.key === 'email'
                ? sortConfig.direction === 'asc'
                  ? '⬆'
                  : '⬇'
                : ''}
            </th>
            <th
              className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-wide"
              onClick={() => handleSort('fecha_nacimiento')}
            >
              Fecha Nacimiento{' '}
              {sortConfig.key === 'fecha_nacimiento'
                ? sortConfig.direction === 'asc'
                  ? '⬆'
                  : '⬇'
                : ''}
            </th>
            <th className="px-4 py-2 border-b border-slate-400">Obra Social</th>
          </tr>
        </thead>
        <tbody className="bg-[#d5d2e4]">
          {sortedPatients.length > 0 ? (
            sortedPatients.map((patient) => (
              <tr
                key={patient._id}
                className="transition duration-150 text-left hover:bg-[#918f9c] cursor-pointer"
                onClick={() => OpenRightAside(patient)}
              >
                <td className="px-4 py-2 border-b border-slate-400">
                  {patient.nombre}
                </td>
                <td className="px-4 py-2 border-b border-slate-400">
                  {patient.apellido}
                </td>
                <td className="px-4 py-2 border-b border-slate-400">
                  {patient.email}
                </td>
                <td className="px-4 py-2 border-b border-slate-400">
                  {new Date(patient.fecha_nacimiento).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b border-slate-400">
                  {patient.obra_social}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                No se encontraron pacientes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rightAside && <RightAsidePatient user={selectedUser} />}
    </div>
  );
};
