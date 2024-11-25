// imports
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import services
import { updateMyProfile } from '../../services/users';

export const EditPatients = ({ close, deleted, selected }) => {
  //rhf
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [previewImage, setPreviewImage] = useState('');

  //set data
  useEffect(() => {
    if (selected) {
      reset({
        id: selected._id || '',
        nombre: selected.nombre || '',
        apellido: selected.apellido || '',
        dni: selected.dni || '',
        email: selected.email || '',
        numero: selected.numero || '',
        fecha_nacimiento: selected.fecha_nacimiento.split('T')[0] || '',
        obra_social: selected.obra_social || '',
      });
      setPreviewImage(selected.imagenUrl || '');
    }
  }, [selected, reset]);
  //on Submit function
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });

      // add image
      if (data.image) {
        formData.append('image', data.image);
      }

      // call the update service
      const response = await updateMyProfile(selected._id, formData);
      console.log('Profile updated successfully:', response);

      // close modal after updating data
      close();
      window.location.reload();
    } catch (error) {
      console.error(
        'Failed to update profile:',
        error.response ? error.response.data : error.message
      );
    }
  };
  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  useEffect(() => {
    // Escape function
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-5/6 p-8 bg-white shadow-lg rounded-xl md:w-1/2 lg:w-1/3">
        <h1 className="mb-6 text-xl font-semibold text-center">
          EDITAR PACIENTE
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
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
              className="w-full px-3 py-2 transition-all duration-300 border rounded-lg shadow-sm cursor-pointer shadow-blue-600 hover:shadow-md hover:shadow-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            {/* Nombre */}
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700">Nombre:</label>
              <input
                type="text"
                {...register('nombre', { required: 'Este campo es requerido' })}
                className="p-2 transition-all duration-300 border rounded-lg shadow-sm focus:outline-none shadow-blue-600 hover:shadow-md hover:shadow-blue-500"
              />
              {errors.nombre && (
                <span className="text-red-600">{errors.nombre.message}</span>
              )}
            </div>

            {/* Apellido */}
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700">Apellido:</label>
              <input
                type="text"
                {...register('apellido', {
                  required: 'Este campo es requerido',
                })}
                className="p-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 shadow-blue-600 hover:shadow-md hover:shadow-blue-500"
              />
              {errors.apellido && (
                <span className="text-red-600">{errors.apellido.message}</span>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            {/* Email */}
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
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none shadow-blue-600 hover:shadow-md hover:shadow-blue-500"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Número */}
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700">Número:</label>
              <input
                type="number"
                {...register('numero', { required: 'Este campo es requerido' })}
                className="p-2 border rounded-lg shadow-sm focus:outline-none shadow-blue-600 hover:shadow-md hover:shadow-blue-500"
              />
              {errors.numero && (
                <span className="text-red-600">{errors.numero.message}</span>
              )}
            </div>
          </div>

          <div className="flex w-auto mb-3 space-x-6">
            {/* Fecha de Nacimiento */}
            <div className="flex flex-col ">
              <label className="text-gray-700">Fecha nacimiento:</label>
              <input
                type="date"
                {...register('fecha_nacimiento', {
                  required: 'Este campo es requerido',
                })}
                className="p-2 border rounded-lg shadow-sm focus:outline-none shadow-blue-600 hover:shadow-md hover:shadow-blue-500"
              />
              {errors.fecha_nacimiento && (
                <span className="text-red-600">
                  {errors.fecha_nacimiento.message}
                </span>
              )}
            </div>
            {/* Obra Social */}
            <div className="flex flex-col ">
              <label className="text-gray-700">Obra Social:</label>
              <select
                {...register('obra_social', {
                  required: 'Este campo es obligatorio',
                })}
                className="p-2 border rounded-lg shadow-sm focus:outline-none shadow-blue-600 hover:shadow-md hover:shadow-blue-500"
                defaultValue="NO TIENE"
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
                <span className="text-red-600">
                  {errors.obra_social.message}
                </span>
              )}
            </div>

            {/* DNI */}
            <div className="flex flex-col ">
              <label className="text-gray-700">DNI:</label>
              <input
                type="number"
                {...register('dni', { required: 'Este campo es requerido' })}
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none shadow-blue-600 hover:shadow-md hover:shadow-blue-500"
              />
              {errors.dni && (
                <span className="text-red-600">{errors.dni.message}</span>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 mr-2 text-gray-700 transition-all duration-300 bg-gray-400 rounded hover:bg-gray-500 hover:tracking-widest"
            >
              Cancelar
            </button>
            <button
              onClick={() => deleted(selected._id)}
              className="px-4 py-2 text-white transition-all duration-300 bg-red-500 rounded-md hover:bg-red-600 hover:tracking-widest"
            >
              Eliminar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white transition-all duration-300 bg-blue-600 rounded hover:bg-blue-700 hover:tracking-widest"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
