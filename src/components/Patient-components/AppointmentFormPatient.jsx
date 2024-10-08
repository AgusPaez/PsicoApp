//imports
import React, { useEffect } from 'react';
//import components
import { ListAppointment } from './ListAppointment';
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
      setValue('dni', dataLogin.dni || '');
      setValue('email', dataLogin.email || '');
      setValue('obra_social', dataLogin.obra_social || '');
      setValue('edad', edad || '');
      setValue('numero', dataLogin.numero || '');
    }
  }, [dataLogin, setValue]);

  const onSubmit = async (data) => {
    try {
      //call service
      const response = await create(data);
      console.log('cita creada correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al intentar crear una cita', error);
    }
  };

  return (
    <section className="min-h-[81.2vh] 2xl:h-[86vh] bg-cover bg-center relative z-40 p-10 px-32  flex-grow">
      <ListAppointment />
      <div id="appointment-form"></div>
      <div className="rounded-2xl bg-[#dad4c4] bg-opacity-65 border border-slate-400 mb-28">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 m-6">
          <div className="flex items-center justify-center gap-4 p-2 m-4">
            <h2 className="font-semibold text-black">SOLICITAR CITA</h2>
          </div>

          <div className="flex w-full gap-8 my-4">
            <div className="w-4/12 p-4 m-2 ">
              <label className="pb-4"> Nombre : </label>
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

            <div className="w-4/12 p-4 m-2 ">
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
            <div className="w-3/12 p-4 m-2">
              <label className=""> D.N.I. : </label>
              <input
                placeholder="dni"
                className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="dni"
                {...register('dni')}
                disabled
              />
            </div>
            <div className="p-4 m-2">
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
          <div className="flex w-full gap-8 my-4">
            <div className="w-5/12 p-4 m-2 ">
              <label> Email : </label>
              <input
                placeholder="Email"
                className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-slate-600"
                id="email"
                {...register('email')}
                disabled
              />
            </div>
            <div className="p-4 m-2">
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

            <div className="p-4 m-2">
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
          <div className="flex w-full gap-6 my-4">
            <div className="w-1/2 ">
              <div className="flex h-1/2">
                <div className="w-1/2 p-4 m-2">
                  <label htmlFor="fecha_consulta">
                    Fecha y hora de consulta:
                  </label>
                  <input
                    type="datetime-local"
                    placeholder="fecha de consulta"
                    className="w-full h-9 rounded-xl opacity-60 focus:opacity-80 p-1.5 bg-[#f7f5ef] text-black"
                    id="fecha_consulta"
                    {...register('fecha_consulta', { required: true })}
                  />
                  {errors.fecha_consulta &&
                    errors.fecha_consulta.type === 'required' && (
                      <span className="text-red-500 text-xs m-2 mt-0.5">
                        La fecha de la consulta es obligatoria
                      </span>
                    )}
                </div>
                <div className="w-1/2 p-4 m-2 ">
                  <label> Derivacion : </label>
                  <input
                    className="w-full h-9 p-1.5 rounded-xl opacity-60 focus:opacity-80 bg-[#f7f5ef]  text-black"
                    id="derivacion"
                    {...register('derivacion')}
                  />
                </div>
              </div>
              <div className="flex items-end justify-center p-4 mb-4 h-1/2">
                <button
                  className="w-4/12 h-12 mb-5 transition-all duration-300 hover:w-5/12 hover:font-semibold hover:tracking-wider rounded-2xl bg-slate-400 hover:bg-slate-500"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </div>

            <div className="w-1/2 p-4 m-2">
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
          </div>
        </form>
      </div>
    </section>
  );
};
