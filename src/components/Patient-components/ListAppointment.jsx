//imports
import React, { useEffect, useState } from 'react';
//import services
import { getAppointmentsByEmail } from '../../services/appointmentService';
import { updateAppointment } from '../../services/appointmentService';
//import context
import { useAuth } from '../../context/AuthProvider';

export const ListAppointment = () => {
  //context
  const { dataLogin } = useAuth();
  //states
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        //call service
        const response = await getAppointmentsByEmail(dataLogin.email);
        setAppointment(response);
      } catch (error) {}
    };
    fetchAppointment();
  }, []);
  // setOpenAdd(!openAdd);

  // Helper function to check if the appointment can be canceled
  const canCancelAppointment = (appointmentDate) => {
    const currentDate = new Date();
    const appointmentDateObj = new Date(appointmentDate);

    // Calcula la diferencia en días
    const diffInTime = appointmentDateObj.getTime() - currentDate.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    // Si la diferencia es mayor o igual a 2 días, se puede cancelar
    return diffInDays >= 2;
  };

  // Función para cancelar una cita
  const cancelAppo = async (id, appointment) => {
    try {
      // Crea una copia de la cita con el estado actualizado
      const updatedAppointment = {
        ...appointment,
        estado_consulta: 'cancelada',
      };

      // Llamada al servicio para actualizar la cita
      const response = await updateAppointment(id, updatedAppointment);

      // Actualiza el estado de las citas localmente si es necesario
      setAppointment((prevAppointments) =>
        prevAppointments.map((app) =>
          app._id === id ? { ...app, estado_consulta: 'cancelada' } : app
        )
      );

      // Recarga la página o actualiza la vista de forma opcional
      // window.location.reload();
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  return (
    <>
      <section
        id="List-Appointment"
        className="flex flex-col p-2 md:p-5 mb-16 rounded-2xl opacity-90 bg-[#dad4c4] bg-opacity-65 border border-slate-400"
      >
        <div className="flex items-center justify-center gap-4 p-2 m-4">
          <h2 className="font-semibold text-black">MIS CITAS</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-300 bg-gray-800 rounded-md shadow-lg table-auto md:min-w-full ">
            <thead>
              <tr className="text-sm font-semibold tracking-wide text-gray-200 uppercase bg-gradient-to-r from-[#554b4bd8] via-[#5a5757] via-50% to-[#554b4bd8]">
                <th className="px-2 py-3 text-left">Fecha consulta</th>
                <th className="px-2 py-3 text-left">Derivacion</th>
                <th className="px-2 py-3 text-left">O.S.</th>
                <th className="px-2 py-3 text-left">Estado</th>
                <th className="w-3/12 px-2 py-3 text-left ">
                  Motivo de consulta
                </th>
                <th className="w-auto px-2 py-3 text-left ">Accion</th>
              </tr>
            </thead>
            <tbody>
              {appointment.length > 0 ? (
                appointment.map((appointment, index) => (
                  <tr
                    key={index}
                    className="transition-all duration-500 
                even:bg-gradient-to-r even:from-[#685b5bd8] even:via-[#646161] even:via-50% even:to-[#685b5bd8] 
                odd:bg-gradient-to-r odd:from-[#9b8989d8] odd:via-[#6b6969] odd:via-50% odd:to-[#9b8989d8]
                hover:bg-gradient-to-r hover:from-[#4a4040] hover:via-[#383636] hover:to-[#4a4040]"
                  >
                    <td className="px-2 py-2 text-sm border-b border-gray-700">
                      {new Date(
                        new Date(appointment.fecha_consulta).getTime() +
                          3 * 60 * 60 * 1000
                      ).toLocaleString('es-ES', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}{' '}
                      hs
                    </td>

                    <td className="px-2 py-2 text-sm border-b border-gray-700 first-letter:uppercase">
                      {appointment.derivacion}
                    </td>
                    <td className="px-2 py-2 text-sm border-b border-gray-700 first-letter:uppercase">
                      {dataLogin.obra_social}
                    </td>
                    <td className="px-2 py-2 text-sm border-b border-gray-700 first-letter:uppercase">
                      {appointment.estado_consulta}
                    </td>
                    <td className="px-2 py-2 text-sm border-b border-gray-700 first-letter:uppercase">
                      {appointment.motivo_consulta.slice(0, 50)}
                      {appointment.motivo_consulta.length > 50 && '...'}
                    </td>
                    <td className="px-2 py-2 text-sm border-b border-gray-700 first-letter:uppercase">
                      {(canCancelAppointment(appointment.fecha_consulta) &&
                        appointment.estado_consulta === 'pendiente') ||
                      appointment.estado_consulta === 'confirmada' ? (
                        <button
                          className="px-3 py-1 uppercase bg-red-500 rounded-lg hover:bg-red-800 "
                          onClick={() =>
                            cancelAppo(appointment._id, appointment)
                          }
                        >
                          cancelar
                        </button>
                      ) : (
                        <button
                          className="px-3 py-1 uppercase rounded-lg bg-slate-700 "
                          disabled
                        >
                          cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {' '}
                  <td
                    colSpan="3"
                    className="px-2 py-2 text-sm border-b border-gray-700 first-letter:uppercase"
                  >
                    No tienes citas en tu historial
                  </td>{' '}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
