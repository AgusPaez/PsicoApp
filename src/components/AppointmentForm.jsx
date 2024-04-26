import React from 'react';

//Import Hook
import { useForm } from 'react-hook-form';
//images
import imgAppointment from '../assets/images/imgAppointment.jpg';

export const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Recurso creado exitosamente.');
      } else {
        console.error('Error al crear el recurso.');
      }
    } catch (error) {
      console.error('Error al conectarse con la API:', error);
    }
  };

  return (
    <>
      <section className="h-[82vh] grid grid-cols-2 gap-10">
        <div className="p-10">
          <form onSubmit={handleSubmit(onSubmit)} className=" p-6 m-6">
            <h2 className="text-lg ml-4">Pedir una cita</h2>
            <div className="flex w-full my-4 gap-6">
              <div className="w-2/5">
                <input
                  placeholder="Nombre"
                  className="m-2 h-9 p-4 w-full rounded-2xl"
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
                  className="m-2 rounded-2xl h-9 p-4 w-full"
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
                  className="m-2 h-9 p-4 w-full rounded-2xl"
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
                className="m-2 my-4 h-9 p-4 w-full rounded-2xl"
                id="email"
                {...register('email', { required: false })}
              />
            </div>
            <div className="flex w-full my-4 gap-6">
              <div className="w-1/2">
                <input
                  placeholder="Numero de telefono"
                  className="m-2 h-9 p-4 w-full rounded-2xl"
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
                  placeholder="Derivacion"
                  className="m-2 h-9 p-4 w-full rounded-2xl"
                  id="derivacion"
                  {...register('derivacion')}
                />
              </div>
            </div>
            <div className="my-6">
              <textarea
                placeholder="Motivo de consulta"
                className="m-2 max-h-44 min-h-20 p-4 w-full rounded-2xl text-left"
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
          <img src={imgAppointment} alt="imagen" width={200} height={200} />
        </div>
      </section>
    </>
  );
};
