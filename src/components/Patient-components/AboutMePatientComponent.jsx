// imports
import React, { useEffect, useState } from 'react';
// import components
import { EditMyProfile } from './EditMyProfile';
// import service
import { findAll } from '../../services/appointmentService';
// import context
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const AboutMePatientComponent = () => {
  const navigate = useNavigate();
  // context
  const { dataLogin } = useAuth();
  // states
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // call service
        const response = await findAll();
        setAppointments(response);
        console.log('Se pudieron traer las consultas', response);
      } catch (error) {
        console.error('Error al traer las consultas', error);
      }
    };
    fetchAppointments();
  }, []);

  // Filter appointments for the logged-in patient
  const patientAppointments = appointments.filter(
    (appointment) => appointment.email === dataLogin.email
  );

  // Get the last appointment (most recent)
  const lastAppointment =
    patientAppointments.length > 0
      ? patientAppointments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;

  // Show edit modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // redirect function
  const handleNavigateAndScroll = (section) => {
    navigate('/AppointmentPatient');
    setTimeout(() => {
      const formElement = document.getElementById(section);
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  return (
    <>
      <section className="relative z-40 grid flex-grow grid-cols-1 p-4 md:p-6 md:flex md:space-x-32 md:justify-stretch md:mx-28 justify-items-start opacity-90">
        <div className="bg-[#dad4c4] bg-opacity-65 border w-full md:w-4/12 border-slate-400 rounded-lg shadow-lg ">
          <div className="p-3 md:p-6">
            <h1 className="mb-4 text-xl font-bold md:text-2xl">
              Perfil de {dataLogin.email}
            </h1>
            <div className="space-y-2">
              <p>
                <strong className="text-sm md:text-base">Imagen:</strong>{' '}
                <img
                  src={dataLogin.imagenUrl}
                  alt="Perfil"
                  className="w-20 h-20 rounded-full md:w-24 md:h-24"
                />
              </p>
              <p>
                <strong className="text-sm md:text-base">Nombre:</strong>{' '}
                {dataLogin.nombre}
              </p>
              <p>
                <strong className="text-sm md:text-base">Apellido:</strong>{' '}
                {dataLogin.apellido}
              </p>
              <p>
                <strong className="text-sm md:text-base">Email:</strong>{' '}
                {dataLogin.email}
              </p>
              <p>
                <strong className="text-sm md:text-base">
                  Número de Teléfono:
                </strong>{' '}
                {dataLogin.numero}
              </p>
              <p>
                <strong className="text-sm md:text-base">
                  Fecha de Nacimiento:
                </strong>{' '}
                {dataLogin.fecha_nacimiento.split('T')[0]}
              </p>
              <p>
                <strong className="text-sm md:text-base">Obra Social:</strong>{' '}
                {dataLogin.obra_social}
              </p>

              <p>
                <strong className="text-sm md:text-base">Creado el:</strong>{' '}
                {new Date(dataLogin.createdAt).toLocaleString()}
              </p>
              <p>
                <strong className="text-sm md:text-base">
                  Actualizado el:
                </strong>{' '}
                {new Date(dataLogin.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 mt-4 text-white transition-all duration-300 rounded bg-slate-600 hover:tracking-widest hover:bg-slate-700"
                onClick={toggleModal}
              >
                Ver/Modificar perfil
              </button>
            </div>
            {showModal && (
              <EditMyProfile profile={dataLogin} onClose={toggleModal} />
            )}
          </div>
        </div>

        <div className="pb-10 mt-10 md:mt-6 md:w-1/2">
          <h2 className="mb-2 text-xl font-semibold">
            Última Cita del Paciente ({dataLogin.email})
          </h2>
          {lastAppointment ? (
            <div className="p-4  border rounded bg-[#dad4c4] bg-opacity-65  border-slate-400">
              <p>
                <strong className="text-sm md:text-base">Nombre:</strong>{' '}
                {lastAppointment.nombre} {lastAppointment.apellido}
              </p>
              <p>
                <strong className="text-sm md:text-base">Edad:</strong>{' '}
                {lastAppointment.edad}
              </p>
              <p>
                <strong className="text-sm md:text-base">
                  Motivo de Consulta:
                </strong>{' '}
                {lastAppointment.motivo_consulta}
              </p>
              <p>
                <strong className="text-sm md:text-base">Derivación:</strong>{' '}
                {lastAppointment.derivacion}
              </p>
              <p>
                <strong className="text-sm md:text-base">Número:</strong>{' '}
                {lastAppointment.numero}
              </p>
              <p>
                <strong className="text-sm md:text-base">Email:</strong>{' '}
                {lastAppointment.email}
              </p>
              <p>
                <strong className="text-sm md:text-base">
                  Fecha de Consulta:
                </strong>{' '}
                {/* {lastAppointment.fecha_consulta.toLocaleString()} */}
                {new Date(
                  new Date(lastAppointment.fecha_consulta).getTime() +
                    3 * 60 * 60 * 1000
                ).toLocaleString('es-ES', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}{' '}
                hs
              </p>
              <div className="justify-between mt-6 md:flex gap-9">
                <button
                  onClick={() => handleNavigateAndScroll('List-Appointment')}
                  className="w-full px-4 py-2 my-2 text-white transition-all duration-300 rounded md:w-1/2 bg-slate-600 hover:tracking-widest hover:bg-slate-700"
                >
                  Ver Todas las Citas
                </button>
                <button
                  onClick={() => handleNavigateAndScroll('appointment-form')}
                  className="w-full px-4 py-2 my-2 text-white transition-all duration-300 bg-green-700 rounded md:w-1/2 md:w1/2 hover:tracking-widest hover:bg-green-800"
                >
                  Pedir una Cita
                </button>
              </div>
            </div>
          ) : (
            <p>No has solicitado citas.</p>
          )}
        </div>
      </section>
    </>
  );
};
