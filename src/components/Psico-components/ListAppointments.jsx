import React, { useEffect, useState } from 'react';
import { findAll } from '../../services/appointmentService';

const ListAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

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

  return (
    <section className="">
      <div className="overflow-x-auto m-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => sortAppointments('nombre')}
              >
                Nombre{' '}
                {sortConfig.key === 'nombre'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => sortAppointments('apellido')}
              >
                Apellido{' '}
                {sortConfig.key === 'apellido'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => sortAppointments('edad')}
              >
                Edad{' '}
                {sortConfig.key === 'edad'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
              <th className="py-2 px-4 border-b">Motivo Consulta</th>
              <th className="py-2 px-4 border-b ">Derivación</th>
              <th className="py-2 px-4 border-b ">Número</th>
              <th className="py-2 px-4 border-b ">Email</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{appointment.nombre}</td>
                <td className="py-2 px-4 border-b">{appointment.apellido}</td>
                <td className="py-2 px-4 border-b">{appointment.edad}</td>
                <td className="py-2 px-4 border-b">
                  {appointment.motivo_consulta}
                </td>
                <td className="py-2 px-4 border-b">{appointment.derivacion}</td>
                <td className="py-2 px-4 border-b">{appointment.numero}</td>
                <td className="py-2 px-4 border-b">{appointment.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form>
          <input type="text" placeholder="buscador" />
        </form>
      </div>
    </section>
  );
};

export default ListAppointment;
