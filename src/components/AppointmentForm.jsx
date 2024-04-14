import React from 'react';

//Import Hook
import { useForm } from 'react-hook-form';

export const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="flex justify-center center mt-10">
        <div className="m-4 bg-slate-500 border border-black h-auto w-2/5 rounded-3xl">
          <h2 className="text-center  p-4">SOLICITAR CITAS</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" p-6 m-6 flex flex-col "
          >
            <div className="flex">
              <label className="m-2" htmlFor="nombre">
                Nombre
              </label>

              <input
                // placeholder="Porfavor ingrese su nombre completo"
                className="m-1 w-24 rounded-2xl"
                id="nombre"
                {...register('nombre', { required: true })}
              />

              {errors.nombre && errors.nombre.type === 'required' && (
                <span className=" text-red-500 text-xs 0 ">
                  Name is required
                </span>
              )}

              <label className="m-2" htmlFor="apellido">
                Apellido
              </label>
              <input
                className="m-2"
                id="apellido"
                {...register('apellido', { required: true })}
              />
              {errors.nombre && errors.nombre.type === 'required' && (
                <span className=" text-red-500 text-xs 0 ">
                  Name is required
                </span>
              )}
            </div>
            <div className="flex">
              <label className="m-2 w-1/2" htmlFor="nombre">
                Edad
              </label>

              <input
                className="m-2"
                id="nombre"
                {...register('nombre', { required: true })}
              />
            </div>
            <div className="flex">
              <label className="m-2 w-1/2" htmlFor="nombre">
                Motivo de consulta:
              </label>

              <input
                className="m-2"
                id="nombre"
                {...register('nombre', { required: true })}
              />
            </div>
            <div className="flex">
              <label className="m-2 w-1/2" htmlFor="nombre">
                Derivacion o recomendacion de:
              </label>

              <input
                className="m-2"
                id="nombre"
                {...register('nombre', { required: true })}
              />
            </div>

            <button
              className="m-2 bg-slate-400 hover:bg-slate-600"
              type="submit"
            >
              ENVIAR
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
