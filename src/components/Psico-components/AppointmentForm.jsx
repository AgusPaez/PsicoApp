//imports
import React, { useEffect, useState } from 'react';
// import service
import { findPatients } from '../../services/users';
// import hooks rhf
import { useForm } from 'react-hook-form';
//import spinner
import { LoadingSpinner } from '../LoadingSpinner';

export const AppointmentForm = ({ isOpen, onClose, onSave }) => {
  //states
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  //rhf
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //call service
    const fetchPatients = async () => {
      try {
        const data = await findPatients();
        setPatients(data);
      } catch (error) {
        console.log('Error fetch patients', error);
      }
    };
    fetchPatients();
  }, []);

  // Set inputs if select option
  useEffect(() => {
    if (selectedPatient) {
      setValue('nombre', `${selectedPatient.nombre}`);
      setValue('apellido', `${selectedPatient.apellido}`);
      setValue('dni', `${selectedPatient.dni}`);
      setValue('edad', calculateAge(selectedPatient.fecha_nacimiento));
      setValue('numero', `${selectedPatient.numero}`);
      setValue('email', `${selectedPatient.email}`);
    } else {
      // clean inputs
      setValue('nombre', '');
      setValue('apellido', '');
      setValue('dni', '');
      setValue('edad', '');
      setValue('numero', '');
      setValue('email', '');
    }
  }, [selectedPatient, setValue]);

  useEffect(() => {
    // exit when press ESC function
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  //Calculate Age function
  const calculateAge = (birthDate) => {
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(async () => {
      await onSave(data);
      setLoading(false);
      onClose();
      window.location.reload();
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full h-auto max-w-lg max-h-screen p-6 mt-16 mb-16 bg-white rounded-lg shadow-lg bg-gradient-to-b from-[#e7e7e7fb] to-[#fdfdfdfd]">
        <h2 className="mb-4 text-xl font-semibold">Agregar Nueva Cita</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Combo para seleccionar paciente */}
          <div className="mb-4">
            <label className="block text-gray-700">Paciente</label>
            <select
              {...register('paciente', { required: false })}
              className="px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              onChange={(e) => {
                const selectedId = e.target.value;
                const patient = patients.find((p) => p._id === selectedId);
                setSelectedPatient(patient);
              }}
            >
              <option value="">Seleccionar Paciente</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.nombre} {patient.apellido}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 mb-4 ml-8 text-black transition-all duration-300 bg-[#846bca] rounded hover:bg-[#735cac] hover:font-semibold hover:tracking-wide">
              Agregar Paciente
            </button>
          </div>

          {/* Nombre */}
          <div className="flex w-full space-x-7">
            <div className="w-3/5 mb-2">
              <label className="block text-gray-700">Nombre</label>
              <input
                {...register('nombre', {
                  required: 'El nombre es obligatorio',
                })}
                className={`${
                  selectedPatient
                    ? 'text-gray-400 bg-slate-100'
                    : 'text-black  hover:shadow-md hover:shadow-[#846bcacc]'
                } w-full h-8 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                disabled={selectedPatient}
              />
              {errors.nombre && (
                <p className="text-xs text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            {/* Apellido */}
            <div className="w-3/5 mb-4">
              <label className="block text-gray-700">Apellido</label>
              <input
                {...register('apellido', {
                  required: 'El apellido es obligatorio',
                })}
                className={`${
                  selectedPatient
                    ? 'text-gray-400 bg-slate-100 '
                    : 'text-black hover:shadow-md hover:shadow-[#846bcacc]'
                } w-full px-3 py-2 border rounded-lg h-8 shadow-sm shadow-[#846bcaf3]  transition-all duration-300`}
                disabled={selectedPatient}
              />
              {errors.apellido && (
                <p className="text-xs text-red-500">
                  {errors.apellido.message}
                </p>
              )}
            </div>

            {/* Edad */}
            <div className="w-1/6 mb-4 ml-auto">
              <label className="block text-gray-700">Edad</label>
              <input
                type="number"
                {...register('edad', { required: 'La edad es obligatoria' })}
                className={`${
                  selectedPatient
                    ? 'text-gray-400 bg-slate-100'
                    : 'text-black  hover:shadow-md hover:shadow-[#846bcacc]'
                } w-full px-3  py-2 border rounded-lg h-8 shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                disabled={selectedPatient}
              />
              {errors.edad && (
                <p className="text-xs text-right text-red-500">
                  {errors.edad.message}
                </p>
              )}
            </div>
          </div>

          {/* Motivo de la consulta */}
          <div className="mb-4">
            <label className="block text-gray-700">Motivo de Consulta</label>
            <input
              {...register('motivo_consulta', {
                required: 'El motivo de la consulta es obligatorio',
              })}
              className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
            />
            {errors.motivo_consulta && (
              <p className="text-xs text-red-500">
                {errors.motivo_consulta.message}
              </p>
            )}
          </div>

          {/* Derivación */}
          <div className="flex w-full space-x-7">
            <div className="w-1/3 mb-4">
              <label className="block text-gray-700">Derivación</label>
              <input
                {...register('derivacion')}
                className="w-full h-8 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
            </div>

            {/* Número */}
            <div className="w-1/4 mb-4 ml-auto">
              <label className="block text-gray-700">D.N.I.</label>
              <input
                type="number"
                {...register('dni', {
                  required: 'El DNI es obligatorio',
                })}
                className={`${
                  selectedPatient
                    ? 'text-gray-400 bg-slate-100'
                    : 'text-black hover:shadow-md hover:shadow-[#846bcacc]'
                } w-full px-3 py-2 border rounded-lg h-8 shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                disabled={selectedPatient}
              />
              {errors.dni && (
                <p className="text-xs text-right text-red-500">
                  {errors.dni.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="w-1/3 mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className={`${
                  selectedPatient
                    ? 'text-gray-400 bg-slate-100'
                    : 'text-black hover:shadow-md hover:shadow-[#846bcacc]'
                } w-full px-3 py-2 h-8 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                disabled={selectedPatient}
              />
            </div>
          </div>

          {/* Fecha de la consulta */}
          <div className="flex gap-8">
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Consulta</label>
              <input
                type="date"
                {...register('fecha_consulta', {
                  required: 'La fecha de consulta es obligatoria',
                })}
                className="w-full h-10 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.fecha_consulta && (
                <p className="text-xs text-red-500">
                  {errors.fecha_consulta.message}
                </p>
              )}
            </div>

            {/* Estado de la consulta */}
            <div className="mb-4">
              <label className="block text-gray-700">Estado de Consulta</label>
              <select
                {...register('estado_consulta', { required: true })}
                className="w-full h-10 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              >
                <option value="pendiente" className="text-yellow-500">
                  Pendiente
                </option>
                <option value="confirmada" className="text-blue-500">
                  Confirmada
                </option>
                <option value="finalizada" className="text-green-600">
                  Finalizada
                </option>
                <option value="cancelada" className="text-red-500">
                  Cancelada
                </option>
                <option value="noAsistida" className="text-gray-600">
                  No Asistida
                </option>
              </select>
              {errors.estado_consulta && (
                <p className="text-red-500">Este campo es requerido</p>
              )}
            </div>
            {/* Número */}
            <div className="w-1/3 mb-4 ml-auto">
              <label className="block text-gray-700">Número</label>
              <input
                type="number"
                {...register('numero', {
                  required: 'El número es obligatorio',
                })}
                className={`${
                  selectedPatient
                    ? 'text-gray-400 bg-slate-100'
                    : 'text-black hover:shadow-md hover:shadow-[#846bcacc]'
                } w-full px-3 py-2 border rounded-lg h-8 shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                disabled={selectedPatient}
              />
              {errors.numero && (
                <p className="text-xs text-right text-red-500">
                  {errors.numero.message}
                </p>
              )}
            </div>
          </div>

          {/* Detalle de la consulta */}
          <div className="mb-4">
            <label className="block text-gray-700">Detalle de Consulta</label>
            <textarea
              {...register('detalle_consulta')}
              className="w-full px-3 py-2 border rounded min-h-11 max-h-24 shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
            ></textarea>
          </div>

          {/* Botones de Guardar y Cancelar */}
          <div className="flex justify-between ">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-700 transition-all duration-300 bg-gray-400 rounded hover:bg-gray-500 hover:tracking-widest"
            >
              Cancelar
            </button>
            {loading && (
              <div className="mt-4">
                <LoadingSpinner />
              </div>
            )}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] hover:tracking-widest transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
