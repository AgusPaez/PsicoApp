import React from 'react';
//Import Hook
import { useForm } from 'react-hook-form';
//images
import imgAppointment from '../assets/images/imgAppointment.png';
//service
import { create } from '../services/appointmentService';

export const AppointmentForm = () => {
  // validations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await create(data);
    } catch (error) {
      console.error('Error al conectarse con la API:', error);
    }
  };
  const back = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="0.59"><defs><linearGradient gradientTransform="rotate(147, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="hsl(315, 100%, 72%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(0, 0%, 80%)" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.001 0.004" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="43 51" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="screen" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>`;
  return (
    <>
      <section
        className="h-[81.2vh] 2xl:h-[86vh] grid grid-cols-2 gap-10 bg-cover bg-center "
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            back
          )}")`,
        }}
      >
        <div className="p-10">
          <form onSubmit={handleSubmit(onSubmit)} className=" p-6 m-6 ">
            <h2 className="text-lg ml-4">Agendá tu cita</h2>
            <div className="flex w-full my-4 gap-6">
              <div className="w-2/5">
                <input
                  placeholder="Nombre"
                  className="m-2 h-9 p-4 w-full rounded-2xl opacity-60 focus:opacity-80 "
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
                  className="m-2 rounded-2xl h-9 p-4 w-full opacity-60 focus:opacity-80"
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
                  className="m-2 h-9 p-4 w-full rounded-2xl opacity-60 focus:opacity-80 "
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
            <div className="">
              <input
                placeholder="Email"
                className="m-2 my-4 h-9 p-4 w-full rounded-2xl opacity-60 focus:opacity-80"
                id="email"
                {...register('email', { required: false })}
              />
            </div>
            <div className="flex w-full my-4 gap-6">
              <div className="w-1/2">
                <input
                  placeholder="Número de telefono"
                  className="m-2 h-9 p-4 w-full rounded-2xl opacity-60 "
                  id="numero"
                  {...register('numero', { required: true })}
                />
                {errors.numero && errors.numero.type === 'required' && (
                  <span className=" text-red-500 text-xs m-2 mt-0.5 absolute ml-4 ">
                    El número es obligatorio
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <input
                  placeholder="Derivación"
                  className="m-2 h-9 p-4 w-full rounded-2xl opacity-60 focus:opacity-80"
                  id="derivacion"
                  {...register('derivacion')}
                />
              </div>
            </div>
            <div className="my-6">
              <textarea
                placeholder="Motivo de consulta"
                className="m-2 max-h-44 min-h-20 p-4 w-full rounded-2xl text-left opacity-60 focus:opacity-80"
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

            <button
              className="m-2 h-12 w-32 bg-slate-400 hover:bg-slate-600 rounded-full"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
        <div className=" flex justify-center items-center">
          <img src={imgAppointment} alt="imagen" width={400} height={400} />
        </div>
      </section>
    </>
  );
};
