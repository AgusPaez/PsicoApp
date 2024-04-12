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
      <div className="m-4 bg-slate-500 border border-black h-auto w-1/2">
        <h2 className="text-center  p-4">CITAS</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" p-6 m-6 flex flex-col "
        >
          <label className="m-2" htmlFor="nombre">
            NOMBRE
          </label>

          <input
            className="m-2"
            id="nombre"
            {...register('nombre', { required: true })}
          />

          {errors.nombre && errors.nombre.type === 'required' && (
            <span className=" text-red-500 text-xs 0 ">Name is required</span>
          )}

          <label className="m-2" htmlFor="apellido">
            APELLIDO
          </label>
          <input
            className="m-2"
            id="apellido"
            {...register('apellido', { required: true })}
          />
          {errors.nombre && errors.nombre.type === 'required' && (
            <span className=" text-red-500 text-xs 0 ">Name is required</span>
          )}

          <button className="m-2" type="submit">
            ENVIAR
          </button>
        </form>
      </div>
    </>
  );
};
