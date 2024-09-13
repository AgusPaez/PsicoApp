import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// Import services
import { updateMyProfile, deleteProfile } from '../../services/users';
// Import context
import { useAuth } from '../../context/AuthProvider';

export const EditMyProfile = ({ profile, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [previewImage, setPreviewImage] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    if (profile) {
      setValue('nombre', profile.nombre || '');
      setValue('apellido', profile.apellido || '');
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue('imagen', file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      if (data.imagen) {
        formData.append('imagen', data.imagen);
      }

      const updatedProfile = await updateMyProfile(profile._id, formData);
      console.log('Profile updated successfully:', updatedProfile);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer w-full p-4 m-2 text-left min-h-12 transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
        />

        <input
          type="text"
          placeholder="Nombre"
          {...register('nombre', { required: true })}
          className="w-full p-4 m-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
        />
        {errors.nombre && (
          <span className="text-red-500">El nombre es obligatorio</span>
        )}

        <input
          type="text"
          placeholder="Apellido"
          {...register('apellido', { required: true })}
          className="w-full p-4 m-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
        />
        {errors.apellido && (
          <span className="text-red-500">El apellido es obligatorio</span>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="w-full p-4 m-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
        />
        {errors.email && (
          <span className="text-red-500">El email es obligatorio</span>
        )}

        <input
          type="text"
          placeholder="Número de Teléfono"
          {...register('numero', { required: true })}
          className="w-full p-4 m-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
        />
        {errors.numero && (
          <span className="text-red-500">El número es obligatorio</span>
        )}

        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          {...register('fecha_nacimiento', { required: true })}
          className="w-full p-4 m-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-9 placeholder-[#7a7a7a] bg-slate-200 hover:bg-slate-100 focus:bg-slate-100 rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
        />
        {errors.fecha_nacimiento && (
          <span className="text-red-500">
            La fecha de nacimiento es obligatoria
          </span>
        )}
        <div className="flex items-center justify-center w-full mt-4">
          <button
            type="submit"
            className="w-3/5 h-12 m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-white bg-[#644fff] border border-transparent rounded-lg group hover:bg-[#503ce7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between mt-0">
        <button
          className="w-32 h-12 m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-white bg-[#b93d3dc7] border border-transparent rounded-lg group hover:bg-[#db4d4de7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={deleteMyProfile}
        >
          ELIMINAR PERFIL
        </button>

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
