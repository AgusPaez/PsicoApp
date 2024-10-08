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
      <section className="relative z-40 flex flex-grow p-6 space-x-32 justify-stretch mx-28 justify-items-start opacity-90">
        <div className="bg-[#dad4c4] bg-opacity-65 border border-slate-400 rounded-lg shadow-lg ">
          <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">
              Perfil de {dataLogin.email}
            </h1>
            <div className="space-y-2">
              <p>
                <strong>Imagen:</strong>{' '}
                <img
                  src={dataLogin.imagenUrl}
                  alt="Perfil"
                  className="w-24 h-24 rounded-full"
                />
              </p>
              <p>
                <strong>Nombre:</strong> {dataLogin.nombre}
              </p>
              <p>
                <strong>Apellido:</strong> {dataLogin.apellido}
              </p>
              <p>
                <strong>Email:</strong> {dataLogin.email}
              </p>
              <p>
                <strong>Número de Teléfono:</strong> {dataLogin.numero}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{' '}
                {dataLogin.fecha_nacimiento.split('T')[0]}
              </p>
              <p>
                <strong>Obra Social:</strong> {dataLogin.obra_social}
              </p>

              <p>
                <strong>Creado el:</strong>{' '}
                {new Date(dataLogin.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Actualizado el:</strong>{' '}
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

        <div className="w-1/2 mt-6 ">
          <h2 className="mb-2 text-xl font-semibold">
            Última Cita del Paciente ({dataLogin.email})
          </h2>
          {lastAppointment ? (
            <div className="p-4  border rounded bg-[#dad4c4] bg-opacity-65  border-slate-400">
              <p>
                <strong>Nombre:</strong> {lastAppointment.nombre}{' '}
                {lastAppointment.apellido}
              </p>
              <p>
                <strong>Edad:</strong> {lastAppointment.edad}
              </p>
              <p>
                <strong>Motivo de Consulta:</strong>{' '}
                {lastAppointment.motivo_consulta}
              </p>
              <p>
                <strong>Derivación:</strong> {lastAppointment.derivacion}
              </p>
              <p>
                <strong>Número:</strong> {lastAppointment.numero}
              </p>
              <p>
                <strong>Email:</strong> {lastAppointment.email}
              </p>
              <p>
                <strong>Fecha de Consulta:</strong>{' '}
                {new Date(lastAppointment.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => handleNavigateAndScroll('List-Appointment')}
                  className="px-4 py-2 text-white transition-all duration-300 rounded bg-slate-600 hover:tracking-widest hover:bg-slate-700"
                >
                  Ver Todas las Citas
                </button>
                <button
                  onClick={() => handleNavigateAndScroll('appointment-form')}
                  className="px-4 py-2 text-white transition-all duration-300 bg-green-700 rounded hover:tracking-widest hover:bg-green-800"
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
