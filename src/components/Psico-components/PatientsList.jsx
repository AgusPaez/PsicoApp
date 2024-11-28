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

  //handle open right aside
  const OpenRightAside = (patient) => {
    setRightAside(true);
    setSelectedUser(patient);
  };
  //handle close aside
  const CloseRightAside = () => {
    setRightAside(false);
  };

  return (
    <div className="overflow-x-auto md:p-8 md:pt-1">
      <h2 className="mt-8 mb-6 text-2xl font-bold text-center text-gray-800">
        Lista de Pacientes
      </h2>
      <div className="overflow-y-auto h-5/6 scrollbar scrollbar-thumb-blue-500 scrollbar-track-slate-600">
        <table className="min-w-full overflow-hidden text-gray-300 bg-gray-800 border border-gray-400 rounded-md shadow-lg table-auto bg-opacity-30">
          <thead className="bg-gray-700 bg-opacity-40">
            <tr className="text-sm font-semibold tracking-wide text-gray-200 uppercase">
              <th
                className="px-4 py-3 text-left transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
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
                className="px-4 py-3 text-left transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
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
                className="px-4 py-3 text-left transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
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
                className="px-4 py-3 text-left transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-wide"
                onClick={() => handleSort('fecha_nacimiento')}
              >
                Fecha Nacimiento{' '}
                {sortConfig.key === 'fecha_nacimiento'
                  ? sortConfig.direction === 'asc'
                    ? '⬆'
                    : '⬇'
                  : ''}
              </th>
              <th className="px-4 py-3 text-left border-b border-slate-400">
                Obra Social
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 bg-opacity-40">
            {sortedPatients.length > 0 ? (
              sortedPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="transition duration-150 cursor-pointer odd:bg-gray-800 odd:bg-opacity-40 hover:bg-gray-700"
                  onClick={() => {
                    OpenRightAside(patient);
                  }}
                >
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {patient.nombre}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {patient.apellido}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {patient.email}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {patient.fecha_nacimiento.split('T')[0]}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
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
      </div>

      <RightAsidePatient
        isOpen={rightAside}
        user={selectedUser}
        onClose={CloseRightAside}
      />
    </div>
  );
};
