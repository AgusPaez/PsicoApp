// imports
import React, { useEffect, useState } from 'react';
// imports components
import { RightAside } from './RightAside';
import { AppointmentForm } from './AppointmentForm';
// import service
import { findAll, create } from '../../services/appointmentService';

export const estadoConsultaStyles = {
  pendiente: { text: 'PENDIENTE', color: 'text-yellow-500' },
  confirmada: { text: 'CONFIRMADA', color: 'text-blue-500' },
  finalizada: { text: 'FINALIZADA', color: 'text-green-600' },
  cancelada: { text: 'CANCELADA', color: 'text-red-500' },
  noAsistida: { text: 'NO ASISTIDA', color: 'text-gray-600' },
};

const ListAppointment = () => {
  // states
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // function to fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await findAll();
        setAppointments(data);
      } catch (error) {
        console.error('Error al cargar las citas:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Function to sort appointments
  const sortAppointments = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...appointments].sort((a, b) => {
      // if the key = date appointment
      if (key === 'fecha_consulta') {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });

    setSortConfig({ key, direction });
    setAppointments(sortedData);
  };

  // open aside function
  const handleOpenAside = (appointment) => {
    setSelectedAppointment(appointment);
    setIsAsideOpen(true);
  };

  // close aside function
  const handleCloseAside = () => {
    setIsAsideOpen(false);
  };

  // fill the appointment by name, lastname, email
  const filteredAppointments = appointments.filter((appointment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      appointment.nombre.toLowerCase().includes(searchLower) ||
      appointment.apellido.toLowerCase().includes(searchLower) ||
      appointment.email.toLowerCase().includes(searchLower)
    );
  });

  const handleSaveNewAppointment = async (data) => {
    try {
      const createAppointment = await create(data);
      console.log('New appointment:', data);
    } catch (error) {
      console.log('Dont create Appointment', error);
    }
  };

  return (
    <section className="p-4 m-4">
      <div className="pb-8 mx-8 overflow-x-auto">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido, email."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/6 p-2 mb-4 border border-gray-400 rounded-lg"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 mb-4 ml-8 text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:tracking-wide"
        >
          Agregar Cita
        </button>

        <h2 className="mt-8 mb-6 text-2xl font-bold text-center text-gray-800">
          Lista de citas
        </h2>

        <AppointmentForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNewAppointment}
        />
        <div className="overflow-y-auto h-5/6 scrollbar scrollbar-thumb-blue-500 scrollbar-track-slate-600">
          <table className="min-w-full overflow-hidden text-gray-300 bg-gray-800 rounded-md shadow-lg table-auto bg-opacity-30">
            <thead>
              <tr className="text-sm font-semibold tracking-wide text-left text-gray-200 uppercase bg-gray-700 bg-opacity-40">
                <th
                  className="px-4 py-2 transition-all duration-200 border-b border-gray-700 cursor-pointer hover:tracking-widest"
                  onClick={() => sortAppointments('nombre')}
                >
                  Nombre{' '}
                  {sortConfig.key === 'nombre'
                    ? sortConfig.direction === 'asc'
                      ? '⬆'
                      : '⬇'
                    : ''}
                </th>
                <th
                  className="px-4 py-2 transition-all duration-200 border-b border-gray-700 cursor-pointer hover:tracking-widest"
                  onClick={() => sortAppointments('apellido')}
                >
                  Apellido{' '}
                  {sortConfig.key === 'apellido'
                    ? sortConfig.direction === 'asc'
                      ? '⬆'
                      : '⬇'
                    : ''}
                </th>
                <th
                  className="px-4 py-2 transition-all duration-200 border-b border-gray-700 cursor-pointer hover:tracking-widest"
                  onClick={() => sortAppointments('edad')}
                >
                  Edad{' '}
                  {sortConfig.key === 'edad'
                    ? sortConfig.direction === 'asc'
                      ? '⬆'
                      : '⬇'
                    : ''}
                </th>
                <th className="px-4 py-2 border-b border-gray-700">
                  Motivo Consulta
                </th>
                <th
                  className="px-4 py-2 transition-all duration-200 border-b border-gray-700 cursor-pointer hover:tracking-widest"
                  onClick={() => sortAppointments('email')}
                >
                  Email{' '}
                  {sortConfig.key === 'email'
                    ? sortConfig.direction === 'asc'
                      ? '⬆'
                      : '⬇'
                    : ''}
                </th>
                <th
                  className="px-4 py-2 transition-all duration-200 border-b border-gray-700 cursor-pointer hover:tracking-widest"
                  onClick={() => sortAppointments('fecha_consulta')}
                >
                  Fecha Consulta{' '}
                  {sortConfig.key === 'fecha_consulta'
                    ? sortConfig.direction === 'asc'
                      ? '⬆'
                      : '⬇'
                    : ''}
                </th>
                <th className="px-4 py-2 border-b border-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-200 cursor-pointer odd:bg-gray-800 odd:bg-opacity-40 hover:bg-gray-700"
                  onClick={() => handleOpenAside(appointment)}
                >
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {appointment.nombre}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {appointment.apellido}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {appointment.edad}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {appointment.motivo_consulta.slice(0, 60)}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {appointment.email}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-700">
                    {new Date(appointment.fecha_consulta).toLocaleDateString(
                      'es-ES',
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }
                    )}{' '}
                    ||{' '}
                    {new Date(appointment.fecha_consulta).toLocaleTimeString(
                      'es-ES',
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                      }
                    )}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm border-b border-gray-700 ${
                      estadoConsultaStyles[appointment.estado_consulta].color
                    }`}
                  >
                    {estadoConsultaStyles[appointment.estado_consulta].text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RightAside
        isOpen={isAsideOpen}
        onClose={handleCloseAside}
        appointment={selectedAppointment}
      />
    </section>
  );
};

export default ListAppointment;
