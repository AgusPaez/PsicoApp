import React, { useState } from 'react';
//Import Hook
import { useForm } from 'react-hook-form';
//images
import imagenAppointmente from '../assets/images/imagenAppointment.png';
//service
import { create } from '../services/appointmentService';
//import Spinner
import { LoadingSpinner } from './LoadingSpinner';

export const AppointmentForm = () => {
  //states
  const [inputType, setInputType] = useState('text');
  const [loading, setLoading] = useState(false);
  // validations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // event.preventDefault();
    setLoading(true);
    try {
      setTimeout(() => {
        const response = create(data);
        setLoading(false);
      }, 4000);
    } catch (error) {
      console.error('Error al conectarse con la API:', error);
      setLoading(false);
    }
  };

  const back = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="0.59"><defs><linearGradient gradientTransform="rotate(147, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="hsl(315, 100%, 72%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(0, 0%, 80%)" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.001 0.004" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="43 51" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="screen" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>`;
  return (
    <>
      <div className="z-50">
        <section
          className="h-[81.2vh] 2xl:h-[86vh] grid grid-cols-2 gap-10 bg-cover bg-center "
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              back
            )}")`,
          }}
        >
          <div className="p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 m-6 ">
              <h2 className="ml-4 text-xl animate-slide">Agendá tu cita</h2>
              <div className="flex w-full gap-6 my-4">
                <div className="w-2/5">
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
                <div className="w-2/5">
                  <input
                    placeholder="Apellido"
                    className="w-full p-4 m-2  h-9 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                    id="apellido"
                    {...register('apellido', { required: true })}
                  />
                  {errors.apellido && errors.apellido.type === 'required' && (
                    <span className=" text-red-500 text-xs m-2 ml-5 mt-0.5 absolute">
                      El apellido es obligatorio
                    </span>
                  )}
                </div>
                <div className="w-1/5">
                  <input
                    placeholder="Edad"
                    className="w-full p-4 m-2 h-9 transition-all duration-500 border-b  shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0]  placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                    id="edad"
                    {...register('edad', { required: true })}
                  />
                  {errors.edad && errors.edad.type === 'required' && (
                    <span className=" text-red-500 text-xs m-2 mt-0.5 absolute">
                      La edad es obligatoria
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full gap-6 my-4">
                <div className="w-1/2">
                  <input
                    placeholder="Email"
                    className="w-full p-4 m-2 my-4 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                    id="email"
                    {...register('email', { required: false })}
                  />
                </div>

                <div className="w-1/2">
                  <input
                    placeholder="Número de telefono"
                    className="w-full p-4 m-2  my-4 transition-all duration-500 border-b  shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                    id="numero"
                    {...register('numero', { required: true })}
                  />
                  {errors.numero && errors.numero.type === 'required' && (
                    <span className=" text-red-500 text-xs m-2 mt-0.5 absolute ml-4 ">
                      El número es obligatorio
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full gap-6 my-4">
                <div className="w-5/12">
                  <input
                    type={inputType}
                    // onFocus={}
                    placeholder="Fecha de consulta"
                    onClick={() => setInputType('datetime-local')}
                    className="w-full text-[#7a7a7a] p-4 m-2 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0] cursor-pointer"
                    id="fecha_consulta"
                    {...register('fecha_consulta', { required: true })}
                  />
                  {errors.fecha_consulta &&
                    errors.fecha_consulta.type === 'required' && (
                      <span className=" text-red-500 text-xs m-2 mt-0.5 absolute ml-4">
                        La fecha de consulta es obligatoria
                      </span>
                    )}
                </div>

                <div className="w-7/12">
                  <input
                    placeholder="Derivación"
                    className="w-full p-4 m-2 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                    id="derivacion"
                    {...register('derivacion')}
                  />
                </div>
              </div>

              <div className="my-6">
                <textarea
                  placeholder="Motivo de consulta"
                  className="w-full p-4 m-2 text-left max-h-44 min-h-20 transition-all duration-500 border-b shadow-[#6aabffe0] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
                  id="motivo_consulta"
                  {...register('motivo_consulta', { required: true })}
                />
                {errors.motivo_consulta &&
                  errors.motivo_consulta.type === 'required' && (
                    <span className=" text-red-500 text-xs m-2 mt-0.5 absolute ml-4">
                      El motivo consulta es obligatorio
                    </span>
                  )}
              </div>
              <div className="flex">
                <button
                  className="w-32 h-12 m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-slate-600 bg-[#6aabffb7] border border-transparent rounded-lg group hover:bg-[#5091e6c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Enviar'}
                </button>
                {loading && (
                  <div className="mx-6 mt-4">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mb-40">
            <img
              src={imagenAppointmente}
              alt="imagen"
              width={400}
              height={400}
            />
          </div>
        </section>
      </div>
    </>
  );
};
