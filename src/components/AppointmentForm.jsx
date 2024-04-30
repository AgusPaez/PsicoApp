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

  return (
    <>
      <section className="h-[82vh] grid grid-cols-2 gap-10">
        <div className="p-10">
          <form onSubmit={handleSubmit(onSubmit)} className=" p-6 m-6">
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
