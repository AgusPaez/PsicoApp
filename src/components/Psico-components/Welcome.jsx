//imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import context
import { useAuth } from '../../context/AuthProvider';

//import service
import { findPatients } from '../../services/users';
import { getAppointmentsByEmail } from '../../services/appointmentService';
export const Welcome = () => {
  //context
  const { dataLogin, logout } = useAuth();
  const navigate = useNavigate();
  //state
  const [activePatientsCount, setActivePatientsCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [appointmentCountLastMonth, setAppointmentCountLastMonth] = useState(0);
  //set active patients
  useEffect(() => {
    const getArgs = async () => {
      try {
        //Patients
        const patients = await findPatients();
        const patientsForUserCount = patients.filter(
          (patient) => patient.rol === 'paciente'
        ).length;
        setActivePatientsCount(patientsForUserCount);

        //Appointment
        const appo = await getAppointmentsByEmail(dataLogin.email);
        const appoLength = appo.length;
        setAppointmentCount(appoLength);

        //Appointment last month
        const now = new Date();

        const firstDayOfCurrentMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          1
        );
        const lastDayOfCurrentMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        );

        const appoCurrentMonth = appo.filter((appo) => {
          const fechaConsulta = new Date(appo.fecha_consulta);
          return (
            fechaConsulta >= firstDayOfCurrentMonth &&
            fechaConsulta <= lastDayOfCurrentMonth
          );
        });
        setAppointmentCountLastMonth(appoCurrentMonth.length);
      } catch (error) {
        console.error('Error al obtener los datos', error);
      }
    };
    getArgs();
  }, []);
  return (
    <>
      <section className="flex flex-col items-center  justify-center mx-16 mt-6 text-gray-200 rounded-lg bg-gradient-to-tr from-[#4e4075] to-[#3d315c] shadow-lg border border-blue-500">
        <h1 className="m-4 text-3xl font-bold">
          ¡Bienvenido, {dataLogin.nombre}!
        </h1>
        <img
          src={dataLogin.imagenUrl}
          alt="Perfil"
          className="w-20 h-20 mt-2 rounded-full"
        />
        <p className="mb-8 text-lg">
          Nos alegra que estés aquí. Como psicólogo, tienes un impacto
          importante en la vida de tus pacientes. Aquí puedes gestionar tu
          perfil y tus citas.
        </p>
        <div className="flex w-full gap-10 px-16 justify-evenly">
          <div className="w-full max-w-2xl p-6 mb-6 bg-gray-800 bg-opacity-50 border border-blue-500 rounded-lg">
            <h2 className="mb-4 text-2xl font-semibold">
              Detalles de tu Perfil
            </h2>
            <p>
              <strong>Nombre:</strong> {dataLogin.nombre} {dataLogin.apellido}
            </p>
            <p>
              <strong>Dni:</strong> {dataLogin.dni}
            </p>
            <p>
              <strong>Email:</strong> {dataLogin.email}
            </p>
            <p>
              <strong>Número de Teléfono:</strong> {dataLogin.numero}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong>{' '}
              {dataLogin.fecha_nacimiento.slice(0, 10)}
            </p>
            <p>
              <strong>Cuenta creada:</strong> {dataLogin.createdAt.slice(0, 10)}
            </p>
            <p>
              <strong>Ultima actualizacion:</strong>{' '}
              {dataLogin.updatedAt.slice(0, 10)}
            </p>
          </div>

          <div className="w-full max-w-2xl p-6 mb-6 bg-gray-800 bg-opacity-50 border border-blue-500 rounded-lg">
            <h2 className="mb-4 text-2xl font-semibold">
              Resumen de Actividad
            </h2>
            <p>Como psicólogo, actualmente tienes:</p>
            <ul className="list-disc list-inside">
              <li className="mb-2">
                pacientes activos: {activePatientsCount}{' '}
              </li>
              <li className="mb-2"> citas programadas: {appointmentCount}</li>
              <li className="mb-2">
                {' '}
                consultas realizadas en el último mes :{' '}
                {appointmentCountLastMonth}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex py-10 space-x-8">
          <button
            onClick={() => navigate('/MyProfile')}
            className="px-4 py-2 mb-4 ml-8 text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:scale-105"
          >
            Mi perfil
          </button>
          <button
            onClick={() => navigate('/AppointmentPsico')}
            className="px-4 py-2 mb-4 ml-8 text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:scale-105"
          >
            Ver Citas
          </button>
          <button
            onClick={() => navigate('/Patients')}
            className="px-4 py-2 mb-4 ml-8 text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:scale-105"
          >
            Ver Pacientes
          </button>
          <button
            onClick={() => navigate('/ControlPanel')}
            className="px-4 py-2 mb-4 ml-8 text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:scale-105"
          >
            Panel de control
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 mb-4 ml-8 text-black transition-all duration-300 bg-[#6954a1] rounded hover:bg-[#594688] hover:font-semibold hover:scale-105"
          >
            SALIR
          </button>
        </div>
      </section>
    </>
  );
};
