//imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//Import Hook
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
//import constant
import { holidays } from '../constants/holidays';
//images
import imagenAppointmente from '../assets/images/imagenAppointment.png';
//service
import { create } from '../services/appointmentService';
//import Spinner
import { LoadingSpinner } from './LoadingSpinner';
//import Alert
import { Alerts } from './Alerts';
registerLocale('es', es);

export const AppointmentForm = () => {
  //states
  const [inputType, setInputType] = useState('text');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [negAlert, setNegAlert] = useState(false);
  const [object, setObject] = useState({});
  const [isMayor, setIsMayor] = useState(true);
  const [edadInformativa, setEdadInformativa] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservedAppointments, setReservedAppointments] = useState([]);
  const [reservedDates, setReservedDates] = useState([]); // Fechas reservadas

  // validations
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const edad = watch('edad');
  useEffect(() => {
    if (edad < 18 && edad !== undefined) {
      setEdadInformativa(
        'Si sos menor a 18 años debes asistir con tus padres a la primera sesión o con su consentimiento firmado'
      );
    } else {
      setEdadInformativa('');
    }
  }, [edad]);

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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      setTimeout(async () => {
        //set GMT+0300
        const timezoneOffset = -3 * 60;
        const adjustedDate = new Date(
          selectedDate.getTime() + timezoneOffset * 60 * 1000
        );

        const payload = {
          ...data,
          fecha_consulta: adjustedDate.toISOString(),
        };

        const response = await create(payload);
        setObject(response);
        setLoading(false);
        setShowAlert(true);
      }, 4000);
    } catch (error) {
      console.error('Error al conectarse con la API:', error);
      setLoading(false);
      setNegAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  // Filter days function
  const filterDates = (date) => {
    const today = startOfDay(new Date(), 1);
    const isHoliday = holidays.includes(date.toISOString().split('T')[0]);

    // Verify days hours
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
  const back = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="0.59"><defs><linearGradient gradientTransform="rotate(147, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="hsl(315, 100%, 72%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(0, 0%, 80%)" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.001 0.004" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="43 51" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="screen" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>`;
  return (
    <>
      <section
        className="z-50 flex-grow gap-10 bg-center bg-cover md:flex "
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            back
          )}")`,
        }}
      >
        <div className="px-2 py-3 mx-1 md:p-10 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-1.5 m-1.5 md:p-6 md:m-6"
          >
            <h2 className="text-xl text-center md:ml-4 animate-slide md:text-start">
              Agendá tu cita
            </h2>
            <div className="w-full gap-6 my-4 md:flex">
              <div className="flex gap-6">
                <div className="w-9/12 mb-5 md:mb-0 md:w-full">
                  <input
                    placeholder="Nombre"
                    className="w-full p-4 m-2 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 rounded-xl opacity-60 focus:bg-slate-100 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                    id="nombre"
                    {...register('nombre', { required: true })}
                  />

                  {errors.nombre && errors.nombre.type === 'required' && (
                    <span className=" text-red-500 text-xs m-2 ml-5 mt-0.5 absolute">
                      El nombre es obligatorio
                    </span>
                  )}
                </div>
                {window.innerWidth < 768 ? (
                  <div className="flex w-3/12 md:hidden ">
                    <input
                      placeholder="Edad"
                      className="w-full p-4 m-2 h-9 transition-all duration-500 border-b  shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0]  placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                      id="edad"
                      {...register('edad', { required: true })}
                    />
                    {errors.edad && errors.edad.type === 'required' && (
                      <span className="absolute -ml-4 mt-[54px] text-xs text-red-500 ">
                        La edad es obligatoria
                      </span>
                    )}
                  </div>
                ) : (
                  <div> </div>
                )}
              </div>

              <div className="flex w-full md:w-2/5">
                <input
                  placeholder="Apellido"
                  className="w-full md:w-full p-4 m-2 h-9 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                  id="apellido"
                  {...register('apellido', { required: true })}
                />
                {errors.apellido && errors.apellido.type === 'required' && (
                  <span className="absolute m-2 mt-[54px] ml-5 text-xs text-red-500 ">
                    El apellido es obligatorio
                  </span>
                )}
              </div>
              {window.innerWidth >= 768 ? (
                <div className="hidden w-1/5 md:flex ">
                  <input
                    placeholder="Edad"
                    className="w-full p-4 m-2 h-9 transition-all duration-500 border-b  shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0]  placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                    id="edad"
                    {...register('edad', { required: true })}
                  />
                  {errors.edad && errors.edad.type === 'required' && (
                    <span className=" text-red-500 text-xs m-2 mt-[54px] absolute">
                      La edad es obligatoria
                    </span>
                  )}
                </div>
              ) : (
                <div> </div>
              )}
            </div>
            <div className="w-full md:h-[68px] gap-6 md:my-4 md:flex">
              <div className="flex mb-4 md:w-1/2">
                <input
                  placeholder="Email"
                  className="w-full p-4 m-2 md:my-4 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                  id="email"
                  {...register('email', { required: false })}
                />
              </div>

              <div className="flex md:w-1/2">
                <input
                  placeholder="Número de telefono"
                  className="w-full p-4 m-2  md:my-4 transition-all duration-500 border-b  shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                  id="numero"
                  {...register('numero', { required: true })}
                />
                {errors.numero && errors.numero.type === 'required' && (
                  <span className=" text-red-500 text-xs m-2 mt-[54px] absolute ml-4 ">
                    El número es obligatorio
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full gap-4 my-4">
              <div className="flex md:w-5/12 ">
                <DatePicker
                  minDate={subDays(new Date(), -1)}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  filterDate={filterDates}
                  timeIntervals={60}
                  showTimeSelect
                  filterTime={filterTimes}
                  dateFormat="Pp"
                  placeholderText="Seleccione fecha y hora"
                  className="w-full md:w-[118%] p-4 m-2 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0] cursor-pointer"
                  calendarClassName="bg-slate-300 rounded-sm"
                  locale={es}
                />
                {errors.fecha_consulta &&
                  errors.fecha_consulta.type === 'required' && (
                    <span className=" text-red-500 text-xs m-2 mt-[54px] absolute ml-4">
                      La fecha de consulta es obligatoria
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

              <div className="flex md:w-7/12">
                <input
                  placeholder="Derivación"
                  className="w-full p-4 m-2 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                  id="derivacion"
                  {...register('derivacion')}
                />
              </div>
            </div>
            <div className="flex my-6">
              <textarea
                placeholder="Motivo de consulta"
                className="w-full p-4 m-2 text-left max-h-44 min-h-20 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                id="motivo_consulta"
                {...register('motivo_consulta', { required: true })}
              />
              {errors.motivo_consulta &&
                errors.motivo_consulta.type === 'required' && (
                  <span className=" text-red-500 text-xs m-2 mt-[100px] absolute ml-4">
                    El motivo consulta es obligatorio
                  </span>
                )}
            </div>
            <div className="flex-row hidden w-full md:flex">
              <div className="w-1/3">
                {' '}
                <button
                  className="w-32 h-12 m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-slate-600 bg-[#6aabffb7] border border-transparent rounded-lg group hover:bg-[#5091e6c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Enviar'}
                </button>
              </div>
              <div className="w-1/3">
                {loading && (
                  <div className="mx-6 mt-4">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
              {edadInformativa && (
                <div className="w-1/3  bg-slate-600 rounded-md px-2 py-1 text-yellow-500 text-xs m-2 mt-[10px]  ">
                  {edadInformativa && <span>{edadInformativa}</span>}
                </div>
              )}
            </div>
            {/* SEPARACION */}
            <div className="flex flex-row w-full md:hidden">
              <div className="w-1/3">
                {' '}
                <button
                  className="w-32 h-12 m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-slate-600 bg-[#6aabffb7] border border-transparent rounded-lg group hover:bg-[#5091e6c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Enviar'}
                </button>
              </div>
              <div className="w-1/3">
                {loading && (
                  <div className="mx-6 mt-4">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:hidden">
              {edadInformativa && (
                <div className="w-full bg-slate-600 rounded-md px-2 py-1 text-yellow-500 text-xs m-2 mt-[10px]  ">
                  {edadInformativa && (
                    <span className="p-2">{edadInformativa}</span>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="items-center justify-center hidden mb-40 md:flex">
          <img src={imagenAppointmente} alt="imagen" width={400} height={400} />
        </div>
        {negAlert && (
          <Alerts
            section={'appointment'}
            condition={'error'}
            title={'Error al registrar la cita'}
            message={
              'Error al intentar enviar los datos, porfavor intente nuevamente mas tarde.'
            }
            time={5000}
            onClose={handleAlertClose}
          />
        )}
        {showAlert && (
          <Alerts
            section={'appointment'}
            object={object}
            condition={'success'}
            title={'Cita enviada correctamente'}
            message={'Los detalles de la cita:'}
            time={0}
            onClose={handleAlertClose}
          />
        )}
      </section>
    </>
  );
};
