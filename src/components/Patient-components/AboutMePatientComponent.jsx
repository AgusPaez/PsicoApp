//imports
import React, { useEffect, useState } from 'react';
//import components
import { EditMyProfile } from './EditMyProfile';
//import service
import { findAll } from '../../services/appointmentService';
//import context
import { useAuth } from '../../context/AuthProvider';

export const AboutMePatientComponent = () => {
  //context
  const { dataLogin } = useAuth();
  //states
  const [appointment, setAppointment] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        //call service
        const response = await findAll();
        setAppointment(response);
        console.log('se pudo traer las consultas', response);
      } catch (error) {
        console('error al traer las consultas', error);
      }
    };
    fetchAppointment();
  }, []);
  //show appointment
  const appointmentFill = appointment.filter(
    (appointment) => appointment.email === dataLogin.email
  );

  //Show edit modal
  const ShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <section>
        <div>
          <h1>Perfil del Paciente</h1>
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
            <strong>Numero de telefono:</strong> {dataLogin.numero}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong> {dataLogin.fecha_nacimiento}
          </p>
          <p>
            <strong>Obra social:</strong> {dataLogin.obra_social}
          </p>
          <p>
            <strong>Imagen :</strong> {dataLogin.imagenUrl || 'No disponible'}
          </p>
          <p>
            <strong>Creado el:</strong>{' '}
            {new Date(dataLogin.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Actualizado el:</strong>{' '}
            {new Date(dataLogin.updatedAt).toLocaleString()}
          </p>

          <button className="bg-slate-600" onClick={ShowModal}>
            Actualizar perfil
          </button>
          {showModal && (
            <EditMyProfile profile={dataLogin} onClose={ShowModal} />
          )}
          <div className="mt-6 mb-auto">
            <h1>Citas del Paciente ({dataLogin.email})</h1>
            {appointmentFill.length > 0 ? (
              <ul>
                {appointmentFill.slice(0, 1).map((cita) => (
                  <li key={cita._id}>
                    <p>
                      <strong>Nombre:</strong> {cita.nombre} {cita.apellido}
                    </p>
                    <p>
                      <strong>Edad:</strong> {cita.edad}
                    </p>
                    <p>
                      <strong>Motivo de Consulta:</strong>{' '}
                      {cita.motivo_consulta}
                    </p>
                    <p>
                      <strong>Derivación:</strong> {cita.derivacion}
                    </p>
                    <p>
                      <strong>Número:</strong> {cita.numero}
                    </p>
                    <p>
                      <strong>Email:</strong> {cita.email}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay citas para este paciente.</p>
            )}
          </div>
        </div>
        datos sobre el perfil (citas, datos personales, cambiar la contraseña ,
        eliminar cuenta)
      </section>
    </>
  );
};
