// imports
import React, { useEffect, useState } from 'react';
// imports components
import { RightAside } from './RightAside';
import { AppointmentForm } from './AppointmentForm';
// import service
import { findAll } from '../../services/appointmentService';
import { create } from '../../services/appointmentService';
// styles from state field
const estadoConsultaStyles = {
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

  // fill the appointmen by name, lastname, email
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
    <section className="">
      <div className="pb-8 m-8 overflow-x-auto">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido, email."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/6 p-2 mb-4 border border-gray-400 round"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 mb-4 ml-8 text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:tracking-wide"
        >
          Agregar Cita
        </button>

        <AppointmentForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNewAppointment}
        />
        <table className="min-w-full text-left bg-white border border-gray-400">
          <thead className="bg-[#9b8197b0]">
            <tr>
              <th
                className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
                onClick={() => sortAppointments('nombre')}
              >
                Nombre ‎
                {sortConfig.key === 'nombre'
                  ? sortConfig.direction === 'asc'
                    ? '⬆'
                    : '⬇'
                  : ''}
              </th>
              <th
                className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
                onClick={() => sortAppointments('apellido')}
              >
                Apellido ‎
                {sortConfig.key === 'apellido'
                  ? sortConfig.direction === 'asc'
                    ? '⬆'
                    : '⬇'
                  : ''}
              </th>
              <th
                className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
                onClick={() => sortAppointments('edad')}
              >
                Edad
                {sortConfig.key === 'edad'
                  ? sortConfig.direction === 'asc'
                    ? '⬆'
                    : '⬇'
                  : ''}
              </th>
              <th className="px-4 py-2 border-b border-slate-400">
                Motivo Consulta
              </th>

              <th
                className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
                onClick={() => sortAppointments('email')}
              >
                Email ‎
                {sortConfig.key === 'email'
                  ? sortConfig.direction === 'asc'
                    ? '⬆'
                    : '⬇'
                  : ''}
              </th>

              <th
                className="px-4 py-2 transition-all duration-200 border-b cursor-pointer border-slate-400 hover:tracking-widest"
                onClick={() => sortAppointments('fecha_consulta')}
              >
                Fecha Consulta
                {sortConfig.key === 'fecha_consulta'
                  ? sortConfig.direction === 'asc'
                    ? '⬆'
                    : '⬇'
                  : ''}
              </th>

              <th className="px-4 py-2 border-b border-slate-400">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-[#d5d2e4]">
            {filteredAppointments.map((appointment, index) => (
              <tr
                key={index}
                className="text-left hover:bg-[#918f9c] cursor-pointer transition-all duration-150"
                onClick={() => handleOpenAside(appointment)}
              >
                <td className="px-4 py-2 border-b border-slate-400">
                  {appointment.nombre}
                </td>
                <td className="px-4 py-2 border-b border-slate-400">
                  {appointment.apellido}
                </td>
                <td className="px-4 py-2 border-b border-slate-400">
                  {appointment.edad}
                </td>
                <td className="px-4 py-2 border-b border-slate-400">
                  {appointment.motivo_consulta}
                </td>

                <td className="px-4 py-2 border-b border-slate-400">
                  {appointment.email}
                </td>
                <td className="px-4 py-2 border-b border-slate-400">
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
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}{' '}
                  hs
                </td>

                <td
                  className={`px-4 py-2 border-b border-slate-400 ${
                    estadoConsultaStyles[appointment.estado_consulta]?.color
                  }`}
                >
                  {estadoConsultaStyles[appointment.estado_consulta]?.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <form>
          <input type="text" placeholder="buscador" />
        </form> */}
      </div>

      <RightAside
        isOpen={isAsideOpen}
        onClose={handleCloseAside}
        appointment={selectedAppointment}
      />
    </section>
  );
};
export { estadoConsultaStyles };
export default ListAppointment;
