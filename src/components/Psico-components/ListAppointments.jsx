// imports
import React, { useEffect, useState } from 'react';
// imports components
import { RightAside } from './RightAside';
// import service
import { findAll } from '../../services/appointmentService';

const ListAppointment = () => {
  // states
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setAppointments(sortedData);
  };

  // styles from state field
  const estadoConsultaStyles = {
    pendiente: { text: 'PENDIENTE', color: 'text-yellow-500' },
    confirmada: { text: 'CONFIRMADA', color: 'text-blue-500' },
    finalizada: { text: 'FINALIZADA', color: 'text-green-600' },
    cancelada: { text: 'CANCELADA', color: 'text-red-500' },
    noAsistida: { text: 'NO ASISTIDA', color: 'text-gray-600' },
  };

  // open aside function
  const handleOpenAside = (appointment) => {
    setSelectedAppointment(appointment); // Establecer la cita seleccionada
    setIsAsideOpen(true);
  };

  // close aside function
  const handleCloseAside = () => {
    setIsAsideOpen(false);
  };

  return (
    <section className="">
      <div className="m-8 overflow-x-auto">
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

              <th className="px-4 py-2 border-b border-slate-400">
                Fecha Consulta
              </th>
              <th className="px-4 py-2 border-b border-slate-400">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-[#d5d2e4]">
            {appointments.map((appointment, index) => (
              <tr
                key={index}
                className="text-left hover:bg-[#918f9c] cursor-pointer transition-all duration-150"
                onClick={() => handleOpenAside(appointment)} // Pasar la cita seleccionada al hacer clic
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
        appointment={selectedAppointment} // Pasar la cita seleccionada al aside
      />
    </section>
  );
};

export default ListAppointment;
