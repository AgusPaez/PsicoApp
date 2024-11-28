//imports
import React, { useEffect, useState } from 'react';
//import components
import { ListAppointment } from './ListAppointment';
//import hooks rhf
import { set, useForm } from 'react-hook-form';
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
//import services
import { create } from '../../services/appointmentService';
//import context
import { useAuth } from '../../context/AuthProvider';
// import Spinner
import { LoadingSpinner } from '../LoadingSpinner';
//import holidays
import { holidays } from '../../constants/holidays';
import axios from 'axios';

export const AppointmentFormPatient = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservedAppointments, setReservedAppointments] = useState([]);
  //context
  const { dataLogin } = useAuth();
  //rhf
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // calculate age function
  const calculateAge = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
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

  // Filter days function
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
  const edad = calculateAge(dataLogin.fecha_nacimiento);
  useEffect(() => {
    if (dataLogin) {
      //set data
      setValue('nombre', dataLogin.nombre || '');
      setValue('apellido', dataLogin.apellido || '');
      setValue('dni', dataLogin.dni || '');
      setValue('email', dataLogin.email || '');
      setValue('obra_social', dataLogin.obra_social || '');
      setValue('edad', edad || '');
      setValue('numero', dataLogin.numero || '');
    }
  }, [dataLogin, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setTimeout(async () => {
        // GMT+0300
        const timezoneOffset = -3 * 60;
        const adjustedDate = new Date(
          selectedDate.getTime() + timezoneOffset * 60 * 1000
        );

        const payload = {
          ...data,
          fecha_consulta: adjustedDate.toISOString(),
        };
        const response = await create(payload);
        setLoading(false);
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.error('Error al intentar crear una cita', error);
    }
  };

  return (
    <section className="min-h-[81.2vh] 2xl:h-[86vh] bg-cover bg-center relative z-30 p-6 px-3 md:p-8 md:px-6 lg:p-10 lg:px-32 flex-grow">
      <ListAppointment />
      <div id="appointment-form"></div>
      <div className="rounded-2xl bg-[#dad4c4] bg-opacity-65 border border-slate-400 mb-28">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-1 m-1 md:p-6 md:m-6"
        >
          <div className="flex items-center justify-center gap-4 p-2 m-4">
            <h2 className="font-semibold text-black">SOLICITAR CITA</h2>
          </div>

          <div className="w-full gap-8 my-4 md:flex">
            <div className="p-1 m-2 md:p-4 md:w-4/12 ">
              <label className="mb-2"> Nombre : </label>
              <input
                placeholder="Nombre"
                className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="nombre"
                {...register('nombre', { required: true })}
                disabled
              />
              {errors.nombre && errors.nombre.type === 'required' && (
                <span className="text-red-500 text-xs m-2 ml-5 mt-0.5 absolute">
                  El nombre es obligatorio
                </span>
              )}
            </div>

            <div className="p-1 m-2 md:p-4 md:w-4/12 ">
              <label className=""> Apellido : </label>
              <input
                placeholder="Apellido"
                className="w-full rounded-xl h-9 opacity-60 focus:opacity-70 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="apellido"
                {...register('apellido', { required: true })}
                disabled
              />
              {errors.apellido && errors.apellido.type === 'required' && (
                <span className="text-red-500 text-xs m-2 ml-5 mt-0.5 absolute">
                  El apellido es obligatorio
                </span>
              )}
            </div>
            <div className="p-1 m-2 md:p-4 md:w-3/12">
              <label className=""> D.N.I. : </label>
              <input
                placeholder="dni"
                className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="dni"
                {...register('dni')}
                disabled
              />
            </div>
            <div className="p-1 m-2 md:p-4">
              <label className=""> Edad : </label>
              <input
                placeholder="Edad"
                className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="edad"
                {...register('edad', { required: true })}
                disabled
              />
              {errors.edad && errors.edad.type === 'required' && (
                <span className="text-red-500 text-xs m-2 mt-0.5 absolute">
                  La edad es obligatoria
                </span>
              )}
            </div>
          </div>
          <div className="w-full gap-8 my-4 md:flex">
            <div className="p-1 m-2 md:p-4 md:w-5/12 ">
              <label> Email : </label>
              <input
                placeholder="Email"
                className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="email"
                {...register('email')}
                disabled
              />
            </div>
            <div className="p-1 m-2 md:p-4">
              <label> Numero Cel : </label>
              <input
                placeholder="Número de telefono"
                className="w-full h-9 rounded-xl opacity-60 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="numero"
                {...register('numero', { required: true })}
                disabled
              />
              {errors.numero && errors.numero.type === 'required' && (
                <span className="text-red-500 text-xs m-2 mt-0.5 absolute ml-4 ">
                  El número es obligatorio
                </span>
              )}
            </div>

            <div className="p-1 m-2 md:p-4">
              <label> Obra Social : </label>
              <input
                placeholder="Obra Social"
                className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="obra_social"
                {...register('obra_social')}
                disabled
              />
            </div>
          </div>
          <div className="w-full gap-6 my-4 md:flex">
            <div className="md:w-1/2 ">
              <div className="md:flex md:h-1/2">
                <div className="p-1 m-2 md:p-4 md:w-1/2">
                  <label htmlFor="fecha_consulta">
                    Fecha y hora de consulta:
                  </label>
                  <DatePicker
                    minDate={subDays(new Date(), -1)}
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    filterDate={filterDates}
                    timeIntervals={60}
                    showTimeSelect
                    filterTime={filterTimes}
                    dateFormat="Pp"
                    className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-black cursor-pointer"
                    calendarClassName="bg-slate-300 rounded-sm"
                    locale={es}
                  />

                  {errors.fecha_consulta &&
                    errors.fecha_consulta.type === 'required' && (
                      <span className="text-red-500 text-xs m-2 mt-0.5">
                        La fecha de la consulta es obligatoria
                      </span>
                    )}
                  {selectedDate && selectedDate < new Date(new Date()) && (
                    <span className="text-red-500 text-xs m-2 mt-[54px] absolute ml-4">
                      La fecha debe ser como mínimo mañana.
                    </span>
                  )}
                  {selectedDate && !filterTimes(selectedDate) && (
                    <span className="text-red-500 text-xs m-2 mt-[54px] absolute ml-4">
                      La hora seleccionada no está disponible. Elija una hora
                      entre las 17:00 y las 20:00.
                    </span>
                  )}
                </div>
                <div className="p-1 m-2 md:p-4 md:w-1/2 ">
                  <label> Derivacion : </label>
                  <input
                    className="w-full h-9 p-1.5 rounded-xl opacity-60 focus:opacity-80 bg-[#f7f5ef]  text-black"
                    id="derivacion"
                    {...register('derivacion')}
                  />
                </div>
              </div>
              <div className="items-end justify-center hidden p-4 mb-4 md:flex h-1/2">
                <button
                  className="w-4/12 h-12 mb-5 transition-all duration-300 hover:w-5/12 hover:font-semibold hover:tracking-wider rounded-2xl bg-slate-400 hover:bg-slate-500"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Enviar'}
                </button>
                {loading && (
                  <div className="hidden mx-5 mt-4 mb-8 md:flex">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </div>
            <div className="p-1 m-2 md:p-4 md:w-1/2">
              <label> Motivo de consulta: </label>
              <textarea
                className="w-full text-left max-h-40 min-h-40 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-black"
                id="motivo_consulta"
                {...register('motivo_consulta', { required: true })}
              />
              {errors.motivo_consulta && (
                <span className="text-red-500 text-xs m-2 mt-0.5">
                  El motivo de consulta es obligatorio
                </span>
              )}
            </div>
            <div className="flex justify-center md:hidden">
              <button
                className="w-4/12 h-12 mb-5 transition-all duration-300 hover:w-5/12 hover:font-semibold hover:tracking-wider rounded-2xl bg-slate-400 hover:bg-slate-500"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Enviar'}
              </button>
            </div>
            {loading && (
              <div className="flex mx-5 mt-4 mb-8 md:hidden">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
