//imports
import React, { useEffect, useState } from 'react';
//import services
import { createProfile } from '../../services/users';
//import hooks rhf
import { useForm } from 'react-hook-form';

export const AddPatientModal = ({ onClose }) => {
  //states
  const [previewImage, setPreviewImage] = useState('');
  //rhf
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  //set value
  setValue('rol', `paciente`);

  //control image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  //send data (create User)
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });
      //add image
      if (data.image) {
        formData.append('image', data.image);
      }
      //call service
      const response = await createProfile(formData);
      console.log('Profile created successfully:', response);
      //close modal after create data
      onClose();
    } catch (error) {
      console.error(
        'Failed to create profile:',
        error.response ? error.response.data : error.message
      );
    }
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 mt-16 mb-16 bg-white rounded-lg shadow-lg bg-gradient-to-b from-[#e7e7e7fb] to-[#fdfdfdfd]">
        <h2 className="mb-4 text-xl font-semibold">Agregar Nuevo Paciente</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Imagen */}
          <div className="mb-4">
            <label className="block text-gray-700">Foto de perfil</label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Previsualización"
                className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
            />
          </div>

          {/* Nombre */}
          <div className="flex w-full space-x-10">
            <div className="w-1/2 mb-4">
              <label className="block text-gray-700">Nombre</label>
              <input
                {...register('nombre', {
                  required: 'El nombre es obligatorio',
                })}
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.nombre && (
                <p className="text-xs text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            {/* Apellido */}
            <div className="w-1/2 mb-4">
              <label className="block text-gray-700">Apellido</label>
              <input
                {...register('apellido', {
                  required: 'El apellido es obligatorio',
                })}
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.apellido && (
                <p className="text-xs text-red-500">
                  {errors.apellido.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex w-full space-x-10">
            <div className="w-1/2 mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                {...register('email', {
                  required: 'El email es obligatorio y único',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'El formato de email es incorrecto',
                  },
                })}
                type="email"
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Numero */}
            <div className="w-1/2 mb-4">
              <label className="block text-gray-700">Número</label>
              <input
                {...register('numero', {
                  required: 'El numero es obligatorio y único',
                })}
                type="number"
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.numero && (
                <p className="text-xs text-red-500">{errors.numero.message}</p>
              )}
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div className="flex space-x-10">
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                {...register('fecha_nacimiento', {
                  required: 'La fecha de nacimiento es obligatoria',
                  validate: (value) => {
                    const today = new Date();
                    const selectedDate = new Date(value);
                    return (
                      selectedDate <= today ||
                      'La fecha de nacimiento no puede ser futura'
                    );
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.fecha_nacimiento && (
                <p className="text-xs text-red-500">
                  {errors.fecha_nacimiento.message}
                </p>
              )}
            </div>

            {/* Combo de Obra Social */}
            <div className="mb-4">
              <label className="block text-gray-700">Obra Social</label>
              <select
                {...register('obra_social', {
                  required: 'Este campo es obligatorio',
                })}
                defaultValue="NO TIENE"
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              >
                <option value="NO TIENE">NO TIENE</option>
                <option value="SANCOR">SANCOR</option>
                <option value="SANCOR SALUD">SANCOR SALUD</option>
                <option value="PROVINCIA">PROVINCIA</option>
                <option value="SWISS">SWISS</option>
                <option value="OSECAC">OSECAC</option>
                <option value="JERARQUICOS">JERARQUICOS</option>
              </select>
              {errors.obra_social && (
                <p className="text-xs text-red-500">
                  {errors.obra_social.message}
                </p>
              )}
            </div>
            {/* DNI */}
            <div className="mb-4">
              <label className="block text-gray-700">D.N.I.</label>
              <input
                {...register('dni')}
                type="number"
                className="w-full px-3 py-2 border rounded-lg shadow-sm  text-gray-400 bg-slate-100  shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
            </div>
          </div>
          {/* Contraseña */}
          <div className="flex w-full space-x-10">
            <div className="w-1/2 mb-4">
              <label className="block text-gray-700">Contraseña</label>
              <input
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                type="password"
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className="w-1/2 mb-4">
              <label className="block text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                {...register('confirmPassword', {
                  required: 'Debe confirmar su contraseña',
                  validate: (value) =>
                    value === getValues('password') ||
                    'Las contraseñas no coinciden',
                })}
                type="password"
                className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {/* Rol */}
            <div className="mb-4">
              <label className="block text-gray-700">Rol</label>
              <input
                {...register('rol', {
                  required: 'El rol es obligatoria',
                })}
                type="text"
                className="w-full px-3 py-2 border rounded-lg shadow-sm  text-gray-400 bg-slate-100  shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                disabled={true}
              />
              {errors.rol && (
                <p className="text-xs text-red-500">{errors.rol.message}</p>
              )}
            </div>
          </div>
          {/* Botones de Guardar y Cancelar */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-700 transition-all duration-300 bg-gray-400 rounded hover:bg-gray-500 hover:tracking-widest"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] hover:tracking-widest transition-all duration-300"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
