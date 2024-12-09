//imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import service
import { findPatients } from '../../services/users';
// import hooks rhf
import { useForm } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  isWeekend,
  addDays,
  setHours,
  setMinutes,
  startOfDay,
  subDays,
} from 'date-fns';
import { es } from 'date-fns/locale';
//import spinner
import { LoadingSpinner } from '../LoadingSpinner';
//import holidays
import { holidays } from '../../constants/holidays';
import axios from 'axios';

export const AppointmentForm = ({ isOpen, onClose, onSave }) => {
  //states
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservedAppointments, setReservedAppointments] = useState([]);
  // Navigate
  const navigate = useNavigate();
  //rhf
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //call service
    const fetchPatients = async () => {
      try {
        const data = await findPatients();
        setPatients(data);
      } catch (error) {
        console.log('Error fetch patients', error);
      }
    };
    fetchPatients();
  }, []);

  // Set inputs if select option
  useEffect(() => {
    if (selectedPatient) {
      setValue('nombre', `${selectedPatient.nombre}`);
      setValue('apellido', `${selectedPatient.apellido}`);
      setValue('dni', `${selectedPatient.dni}`);
      setValue('edad', calculateAge(selectedPatient.fecha_nacimiento));
      setValue('numero', `${selectedPatient.numero}`);
      setValue('email', `${selectedPatient.email}`);
    } else {
      // clean inputs
      setValue('nombre', '');
      setValue('apellido', '');
      setValue('dni', '');
      setValue('edad', '');
      setValue('numero', '');
      setValue('email', '');
    }
  }, [selectedPatient, setValue]);

  useEffect(() => {
    // exit when press ESC function
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  //Calculate Age function
  const calculateAge = (birthDate) => {
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };
  // Get reserved dates
  useEffect(() => {
    const fetchReservedAppointments = async () => {
      try {
        const response = await axios.get(
          'https://backend-api-psicoapp.onrender.com/appointment/reserved-dates-times'
        );
        setReservedAppointments(
          response.data.map((datetime) => new Date(datetime))
        );
      } catch (error) {
        console.error('Error al cargar citas reservadas:', error);
      }
    };

    fetchReservedAppointments();
  }, []);

  useEffect(() => {
    if (reservedAppointments.length > 0) {
      const findNextAvailableDateTime = () => {
        let currentDate = addDays(new Date(), 1);
        currentDate = startOfDay(currentDate);

        while (true) {
          if (filterDates(currentDate)) {
            for (let hour = 17; hour <= 20; hour++) {
              const potentialDateTime = setHours(
                setMinutes(currentDate, 0),
                hour
              );

              if (filterTimes(potentialDateTime)) {
                return potentialDateTime;
              }
            }
          }
          currentDate = addDays(currentDate, 1);
        }
      };

      const nextAvailable = findNextAvailableDateTime();
      if (selectedDate != null) {
        setSelectedDate(nextAvailable);
      }
    }
  }, [reservedAppointments]);

  // Filer days function
  const filterDates = (date) => {
    const today = startOfDay(new Date(), 1);
    const isHoliday = holidays.includes(date.toISOString().split('T')[0]);

    // Verify reserved hours
    const dateString = date.toISOString().split('T')[0];
    const reservationsForDay = reservedAppointments.filter(
      (appointment) => appointment.toISOString().split('T')[0] === dateString
    );

    const allSlotsFull = reservationsForDay.length === 4;

    return date >= today && !isWeekend(date) && !isHoliday && !allSlotsFull;
  };

  // Filter hours function
  const filterTimes = (time) => {
    if (!selectedDate) return true;

    const selectedDay = selectedDate.toISOString().split('T')[0];

    const reservedTimes = reservedAppointments
      .filter(
        (appointment) => appointment.toISOString().split('T')[0] === selectedDay
      )
      .map((appointment) => appointment.getHours());

    const hour = time.getHours();
    return hour >= 17 && hour <= 20 && !reservedTimes.includes(hour);
  };
  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(async () => {
      const timezoneOffset = -3 * 60; // GMT+0300
      const adjustedDate = new Date(
        selectedDate.getTime() + timezoneOffset * 60 * 1000
      );

      const payload = {
        ...data,
        fecha_consulta: adjustedDate.toISOString(),
      };

      await onSave(payload);
      setLoading(false);
      onClose();
      window.location.reload();
    }, 4000);
  };

  if (!isOpen) return null;
  const RedirectAddPatient = () => {
    navigate('/Patients');
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center py-8 bg-black bg-opacity-50">
      <div className="w-full h-[100%] md:h-auto overflow-auto py-12 max-w-lg max-h-screen   p-6 mt-16 mb-16 bg-white rounded-lg shadow-lg bg-gradient-to-b from-[#e7e7e7fb] to-[#fdfdfdfd]">
        <div className="">
          <h2 className="mb-4 text-xl font-semibold text-center">
            Agregar Nueva Cita
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Combo para seleccionar paciente */}
            <div className="mb-4">
              <label className="block text-gray-700">Paciente</label>
              <select
                {...register('paciente', { required: false })}
                className="w-full md:w-auto px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const patient = patients.find((p) => p._id === selectedId);
                  setSelectedPatient(patient);
                }}
              >
                <option value="">Seleccionar Paciente</option>
                {patients
                  .filter((patient) => patient.rol === 'paciente')
                  .map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.nombre} {patient.apellido}
                    </option>
                  ))}
              </select>
              <button
                onClick={RedirectAddPatient}
                className="w-full md:w-auto px-4 py-2 mb-4 mt-4 md:mt-0 md:ml-8 text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:tracking-wide"
              >
                Agregar Paciente
              </button>
            </div>

            {/* Nombre */}
            <div className="w-full md:flex md:space-x-7">
              <div className="mb-2 md:w-3/5">
                <label className="block text-gray-700">Nombre</label>
                <input
                  {...register('nombre', {
                    required: 'El nombre es obligatorio',
                  })}
                  className={`${
                    selectedPatient
                      ? 'text-gray-400 bg-slate-100'
                      : 'text-black  hover:shadow-md hover:shadow-[#846bcacc]'
                  } w-full h-8 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  disabled={selectedPatient}
                />
                {errors.nombre && (
                  <p className="text-xs text-red-500">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              {/* Apellido */}
              <div className="mb-4 md:w-3/5">
                <label className="block text-gray-700">Apellido</label>
                <input
                  {...register('apellido', {
                    required: 'El apellido es obligatorio',
                  })}
                  className={`${
                    selectedPatient
                      ? 'text-gray-400 bg-slate-100 '
                      : 'text-black hover:shadow-md hover:shadow-[#846bcacc]'
                  } w-full px-3 py-2 border rounded-lg h-8 shadow-sm shadow-[#846bcaf3]  transition-all duration-300`}
                  disabled={selectedPatient}
                />
                {errors.apellido && (
                  <p className="text-xs text-red-500">
                    {errors.apellido.message}
                  </p>
                )}
              </div>

              {/* Edad */}
              <div className="mb-4 ml-auto md:w-1/6">
                <label className="block text-gray-700">Edad</label>
                <input
                  type="number"
                  {...register('edad', { required: 'La edad es obligatoria' })}
                  className={`${
                    selectedPatient
                      ? 'text-gray-400 bg-slate-100'
                      : 'text-black  hover:shadow-md hover:shadow-[#846bcacc]'
                  } w-full px-3  py-2 border rounded-lg h-8 shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  disabled={selectedPatient}
                />
                {errors.edad && (
                  <p className="text-xs text-right text-red-500">
                    {errors.edad.message}
                  </p>
                )}
              </div>
            </div>

            {/* Motivo de la consulta */}
            <div className="mb-4">
              <label className="block text-gray-700">Motivo de Consulta</label>
              <input
                {...register('motivo_consulta', {
                  required: 'El motivo de la consulta es obligatorio',
                })}
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.motivo_consulta && (
                <p className="text-xs text-red-500">
                  {errors.motivo_consulta.message}
                </p>
              )}
            </div>

            {/* Derivación */}
            <div className="w-full md:flex md:space-x-7">
              <div className="mb-4 md:w-1/3">
                <label className="block text-gray-700">Derivación</label>
                <input
                  {...register('derivacion')}
                  className="w-full h-8 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                />
              </div>

              {/* Número */}
              <div className="mb-4 ml-auto md:w-1/4">
                <label className="block text-gray-700">D.N.I.</label>
                <input
                  type="number"
                  {...register('dni', {
                    required: 'El DNI es obligatorio',
                  })}
                  className={`${
                    selectedPatient
                      ? 'text-gray-400 bg-slate-100'
                      : 'text-black hover:shadow-md hover:shadow-[#846bcacc]'
                  } w-full px-3 py-2 border rounded-lg h-8 shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  disabled={selectedPatient}
                />
                {errors.dni && (
                  <p className="text-xs text-right text-red-500">
                    {errors.dni.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4 md:w-1/3">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className={`${
                    selectedPatient
                      ? 'text-gray-400 bg-slate-100'
                      : 'text-black hover:shadow-md hover:shadow-[#846bcacc]'
                  } w-full px-3 py-2 h-8 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  disabled={selectedPatient}
                />
              </div>
            </div>

            {/* Fecha de la consulta */}
            <div className="md:flex gap-7">
              <div className="md:w-[8rem] mb-4">
                <label className="block text-gray-700">Fecha de Consulta</label>
                <DatePicker
                  minDate={subDays(new Date(), -1)}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  filterDate={filterDates}
                  timeIntervals={60}
                  showTimeSelect
                  filterTime={filterTimes}
                  dateFormat="Pp"
                  className="w-full h-10 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  calendarClassName="bg-slate-300 rounded-sm"
                  locale={es}
                />

                {errors.fecha_consulta &&
                  errors.fecha_consulta.type === 'required' && (
                    <p className="ext-xs text-red-500t">
                      La fecha de la consulta es obligatoria
                    </p>
                  )}
                {selectedDate && selectedDate < new Date(new Date()) && (
                  <p className="text-xs text-red-500">
                    La fecha debe ser como mínimo mañana.
                  </p>
                )}
                {selectedDate && !filterTimes(selectedDate) && (
                  <p className="text-xs text-red-500 ">
                    La hora seleccionada no está disponible. Elija una hora
                    entre las 17:00 y las 20:00.
                  </p>
                )}
              </div>

              {/* Estado de la consulta */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Estado de Consulta
                </label>
                <select
                  {...register('estado_consulta', { required: true })}
                  className="w-full h-10 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                >
                  <option value="pendiente" className="text-yellow-500">
                    Pendiente
                  </option>
                  <option value="confirmada" className="text-blue-500">
                    Confirmada
                  </option>
                  <option value="finalizada" className="text-green-600">
                    Finalizada
                  </option>
                  <option value="cancelada" className="text-red-500">
                    Cancelada
                  </option>
                  <option value="noAsistida" className="text-gray-600">
                    No Asistida
                  </option>
                </select>
                {errors.estado_consulta && (
                  <p className="text-red-500">Este campo es requerido</p>
                )}
              </div>
              {/* Número */}
              <div className="mb-4 ml-auto md:w-1/3">
                <label className="block text-gray-700">Número</label>
                <input
                  type="number"
                  {...register('numero', {
                    required: 'El número es obligatorio',
                  })}
                  className={`${
                    selectedPatient
                      ? 'text-gray-400 bg-slate-100'
                      : 'text-black hover:shadow-md hover:shadow-[#846bcacc]'
                  } w-full px-3 py-2 border rounded-lg h-8 shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  disabled={selectedPatient}
                />
                {errors.numero && (
                  <p className="text-xs text-right text-red-500">
                    {errors.numero.message}
                  </p>
                )}
              </div>
            </div>

            {/* Detalle de la consulta */}
            <div className="mb-4">
              <label className="block text-gray-700">Detalle de Consulta</label>
              <textarea
                {...register('detalle_consulta')}
                className="w-full px-3 py-2 border rounded min-h-11 max-h-24 shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              ></textarea>
            </div>

            {/* Botones de Guardar y Cancelar */}
            <div className="flex justify-between ">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 mr-2 text-gray-700 transition-all duration-300 bg-gray-400 rounded hover:bg-gray-500 hover:tracking-widest"
              >
                Cancelar
              </button>
              {loading && (
                <div className="mt-4">
                  <LoadingSpinner />
                </div>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] hover:tracking-widest transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>{' '}
      </div>
    </div>
  );
};
