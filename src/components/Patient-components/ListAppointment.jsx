//imports
import React, { useEffect, useState } from 'react';
//import services
import { getAppointmentsByEmail } from '../../services/appointmentService';
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

  return (
    <>
      <section
        id="List-Appointment"
        className="flex flex-col p-2 md:p-5 mb-16 rounded-2xl opacity-90 bg-[#dad4c4] bg-opacity-65 border border-slate-400"
      >
        <div className="flex items-center justify-center gap-4 p-2 m-4">
          <h2 className="font-semibold text-black">MIS CITAS</h2>
        </div>
        <div class="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody>
              {appointment.length > 0 ? (
                appointment.map((appointment, index) => (
                  <tr
                    key={index}
                    className="transition-all duration-500 cursor-pointer
                even:bg-gradient-to-r even:from-[#685b5bd8] even:via-[#646161] even:via-50% even:to-[#685b5bd8] 
                odd:bg-gradient-to-r odd:from-[#9b8989d8] odd:via-[#6b6969] odd:via-50% odd:to-[#9b8989d8]
                hover:bg-gradient-to-r hover:from-[#4a4040] hover:via-[#383636] hover:to-[#4a4040]"
                  >
                    <td className="px-2 py-2 text-sm border-b border-gray-700">
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
                      {appointment.motivo_consulta.slice(0, 50)} ...
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
