//imports
import React, { useEffect } from 'react';
//import hooks rhf
import { useForm } from 'react-hook-form';
//import services
import { create } from '../../services/appointmentService';
//import context
import { useAuth } from '../../context/AuthProvider';
export const AppointmentFormPatient = () => {
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
  const edad = calculateAge(dataLogin.fecha_nacimiento);
  useEffect(() => {
    if (dataLogin) {
      //set data
      setValue('nombre', dataLogin.nombre || '');
      setValue('apellido', dataLogin.apellido || '');
      setValue('email', dataLogin.email || '');
      setValue('edad', edad || '');
      setValue('numero', dataLogin.numero || '');
    }
  }, [dataLogin, setValue]);

  const onSubmit = async (data) => {
    try {
      //call service
      const response = await create(data);
      console.log('cita creada correctamente');
    } catch (error) {
      console.error('Error al intentar crear una cita', error);
    }
  };

  return (
    <section className="h-[81.2vh] 2xl:h-[86vh] grid grid-cols-1 gap-10 bg-cover bg-center">
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 m-6 ">
          <h2 className="ml-4 text-lg">Agendá tu cita</h2>
          <div className="flex w-full gap-6 my-4">
            <div className="w-2/5">
              <input
                placeholder="Nombre"
                className="w-full p-4 m-2 h-9 rounded-2xl opacity-60 focus:opacity-80"
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
            <div className="w-2/5">
              <input
                placeholder="Apellido"
                className="w-full p-4 m-2 rounded-2xl h-9 opacity-60 focus:opacity-80"
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
            <div className="w-1/5">
              <input
                placeholder="Edad"
                className="w-full p-4 m-2 h-9 rounded-2xl opacity-60 focus:opacity-80"
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
          <div>
            <input
              placeholder="Email"
              className="w-full p-4 m-2 my-4 h-9 rounded-2xl opacity-60 focus:opacity-80"
              id="email"
              {...register('email')}
              disabled
            />
          </div>
          <div className="flex w-full gap-6 my-4">
            <div className="w-1/2">
              <input
                placeholder="Número de telefono"
                className="w-full p-4 m-2 h-9 rounded-2xl opacity-60"
                id="numero"
                {...register('numero', { required: true })}
                disabled
              />
              {errors.numero && errors.numero.type === 'required' && (
                <span className="text-red-500 text-xs m-2 mt-0.5 absolute ml-4">
                  El número es obligatorio
                </span>
              )}
            </div>
            <div className="w-1/2">
              <input
                placeholder="Derivación"
                className="w-full p-4 m-2 h-9 rounded-2xl opacity-60 focus:opacity-80"
                id="derivacion"
                {...register('derivacion')}
              />
            </div>
          </div>
          <div className="my-6">
            <textarea
              placeholder="Motivo de consulta"
              className="w-full p-4 m-2 text-left max-h-44 min-h-20 rounded-2xl opacity-60 focus:opacity-80"
              id="motivo_consulta"
              {...register('motivo_consulta', { required: true })}
            />
            {errors.motivo_consulta && (
              <span className="text-red-500 text-xs m-2 mt-0.5 absolute ml-4">
                El motivo consulta es obligatorio
              </span>
            )}
          </div>
          <button
            className="w-32 h-12 m-2 rounded-full bg-slate-400 hover:bg-slate-600"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};
