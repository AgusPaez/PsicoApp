import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// Import services
import { updateMyProfile, deleteProfile } from '../../services/users';
// Import context
import { useAuth } from '../../context/AuthProvider';
// Import spinner
import { LoadingSpinner } from '../LoadingSpinner';

export const EditMyProfile = ({ profile, onClose }) => {
  //states
  const [loading, setLoading] = useState(false);
  //rhf
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [previewImage, setPreviewImage] = useState('');
  const { logout } = useAuth();

  //set values
  useEffect(() => {
    if (profile) {
      setValue('nombre', profile.nombre || '');
      setValue('apellido', profile.apellido || '');
      setValue('dni', profile.dni || '');
      setValue('email', profile.email || '');
      setValue('rol', profile.rol || '');
      setValue('numero', profile.numero || '');
      setValue(
        'fecha_nacimiento',
        profile.fecha_nacimiento ? profile.fecha_nacimiento.slice(0, 10) : ''
      );
      setValue('obra_social', profile.obra_social || 'NO TIENE');
      setPreviewImage(profile.imagenUrl || '');
    }
  }, [profile, setValue]);

  //handle image function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue('imagen', file);
    }
  };

  //handle submit
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      if (data.imagen) {
        formData.append('imagen', data.imagen);
      }
      setTimeout(async () => {
        //call service
        const updatedProfile = await updateMyProfile(profile._id, formData);
        console.log('Profile updated successfully:', updatedProfile);
        setLoading(false);
      }, 4000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setTimeout(() => {
        setLoading(false);
      }, 3500);
    }
  };
  //destroy my profile function
  const deleteMyProfile = async () => {
    try {
      await deleteProfile(profile._id);
      console.log('Profile deleted successfully');
      logout();
    } catch (error) {
      console.error('Error al intentar borrar mi perfil', error);
    }
  };

  return (
    <div className="p-6 mt-56 mb-64 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-center">Editar Perfil</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {previewImage && (
          <img
            src={previewImage}
            alt="Previsualización"
            className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
          />
        )}
        <label className="pl-4 text-sm"> Imagen de perfil </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer w-full p-4 mx-2 text-left min-h-12 transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
        />
        <div className="flex w-full gap-4">
          <div className="w-1/2">
            <label className="pl-4 text-sm"> Nombre </label>
            <input
              type="text"
              placeholder="Nombre"
              {...register('nombre', { required: true })}
              className="w-full p-4 mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            {errors.nombre && (
              <span className="text-red-500">El nombre es obligatorio</span>
            )}
          </div>
          <div className="w-1/2">
            <label className="pl-4 text-sm">Apellido</label>
            <input
              type="text"
              placeholder="Apellido"
              {...register('apellido', { required: true })}
              className="w-full p-4 mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            {errors.apellido && (
              <span className="text-red-500">El apellido es obligatorio</span>
            )}
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-7/12">
            <label className="pl-4 text-sm"> Email </label>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="w-full p-4 mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            {errors.email && (
              <span className="text-red-500">El email es obligatorio</span>
            )}
          </div>
          <div className="w-2/6">
            <label className="pl-4 text-sm"> DNI </label>
            <input
              type="number"
              placeholder="DNI"
              {...register('dni', { required: true })}
              className="w-full p-4 mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-1/2">
            <label className="pl-4 text-sm"> Número </label>
            <input
              type="number"
              placeholder="Número de Teléfono"
              {...register('numero', { required: true })}
              className="w-full p-4 mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            {errors.numero && (
              <span className="text-red-500">El número es obligatorio</span>
            )}
          </div>
          <div className="w-1/2">
            <label className="pl-4 text-sm"> Fecha nacimiento </label>
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              {...register('fecha_nacimiento', { required: true })}
              className="w-full p-4 mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            {errors.fecha_nacimiento && (
              <span className="text-red-500">
                La fecha de nacimiento es obligatoria
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-3/5 h-12 m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-white bg-[#644fff] border border-transparent rounded-lg group hover:bg-[#503ce7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Cargando...' : 'Guardar'}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between mt-0">
        <button
          className="w-32 h-12 m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-white bg-[#bd3a3ad5] border border-transparent rounded-lg group hover:bg-[#ff5151f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={deleteMyProfile}
        >
          ELIMINAR PERFIL
        </button>
        <div className="m-2">{loading && <LoadingSpinner />}</div>
        <button
          onClick={onClose}
          className="w-32 h-12 m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-white bg-[#666666c7] border border-transparent rounded-lg group hover:bg-[#424242d8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
