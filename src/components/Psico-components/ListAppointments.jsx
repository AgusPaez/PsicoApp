//imports
import React, { useEffect, useState } from 'react';
//import service
import { findAll } from '../../services/appointmentService';

const ListAppointment = () => {
  //states
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  //function to fetch appointments
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

  return (
    <section className="">
      <div className="m-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th
                className="px-4 py-2 border-b cursor-pointer"
                onClick={() => sortAppointments('nombre')}
              >
                Nombre
                {sortConfig.key === 'nombre'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
              <th
                className="px-4 py-2 border-b cursor-pointer"
                onClick={() => sortAppointments('apellido')}
              >
                Apellido
                {sortConfig.key === 'apellido'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
              <th
                className="px-4 py-2 border-b cursor-pointer"
                onClick={() => sortAppointments('edad')}
              >
                Edad
                {sortConfig.key === 'edad'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
              <th className="px-4 py-2 border-b">Motivo Consulta</th>
              <th className="px-4 py-2 border-b ">Derivación</th>
              <th className="px-4 py-2 border-b ">Número</th>
              <th
                className="px-4 py-2 border-b cursor-pointer "
                onClick={() => sortAppointments('email')}
              >
                Email
                {sortConfig.key === 'email'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border-b">{appointment.nombre}</td>
                <td className="px-4 py-2 border-b">{appointment.apellido}</td>
                <td className="px-4 py-2 border-b">{appointment.edad}</td>
                <td className="px-4 py-2 border-b">
                  {appointment.motivo_consulta}
                </td>
                <td className="px-4 py-2 border-b">{appointment.derivacion}</td>
                <td className="px-4 py-2 border-b">{appointment.numero}</td>
                <td className="px-4 py-2 border-b">{appointment.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form>
          <input type="text" placeholder="buscador" />
        </form>
      </div>
      <button className="text-white bg-purple-900">agregar una cita</button>
      <div>
        form para agregar una cita
        <form className="grid gap-2 cols">
          <input type="text" placeholder="seleccionar paciente" />
          <input type="text" placeholder="nombre" />
          <input type="text" placeholder="apellido" />
          <input type="text" placeholder="edad" />
          <input type="text" placeholder="derivacion" />
          <input type="text" placeholder="numero" />
          <input type="text" placeholder="email" />
          {/* <input type="text" placeholder="Detalles de la sesion" />
          <input type="text" placeholder="historial" /> */}
        </form>
      </div>
    </section>
  );
};

export default ListAppointment;
