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
    reset,
  } = useForm();
  const [previewImage, setPreviewImage] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    //set values
    if (profile) {
      reset({
        id: profile._id || '',
        matricula_profesional: profile.matricula_profesional || '',
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        dni: profile.dni || '',
        email: profile.email || '',
        numero: profile.numero || '',
        fecha_nacimiento: profile.fecha_nacimiento.split('T')[0] || '',
      });
      setPreviewImage(profile.imagenUrl || '');
    }
  }, [profile, reset]);

  //handle image function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  //handle submit
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });

      if (data.image) {
        formData.append('image', data.image);
      }
      setTimeout(async () => {
        //call service
        const updatedProfile = await updateMyProfile(profile._id, formData);
        console.log('Profile updated successfully:', updatedProfile);
        setLoading(false);
        window.location.reload();
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
    <div className="p-6 mt-64 bg-white rounded-lg shadow-md md:mt-56 md:mb-64 mb-72">
      <h2 className="mb-4 text-lg font-semibold text-center md:text-xl">
        Editar Perfil
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {previewImage && (
          <img
            src={previewImage}
            alt="Previsualización"
            className="object-cover w-16 h-16 mx-auto rounded-full md:mb-4 md:w-32 md:h-32"
          />
        )}
        <div className="flex w-full">
          <div className="px-3 ">
            <label className="pl-4 text-sm"> Imagen de perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer w-full p-4 md:mx-2 text-left min-h-12 transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-4 md:h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            <div className="">
              <label className="pl-4 text-sm"> Matricula </label>
              <input
                type="number"
                placeholder="Matricula Profesional"
                {...register('matricula_profesional', { required: true })}
                className="w-full p-4 md:mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-4 md:h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 px-3 md:gap-4">
          <div className="w-1/2">
            <label className="pl-4 text-sm"> Nombre </label>
            <input
              type="text"
              placeholder="Nombre"
              {...register('nombre', { required: true })}
              className="w-full p-4 md:mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-4 md:h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
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
              className="w-full p-4 md:mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-4 md:h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            {errors.apellido && (
              <span className="text-red-500">El apellido es obligatorio</span>
            )}
          </div>
        </div>
        <div className="flex w-full gap-2 px-3 md:gap-4">
          <div className="w-7/12">
            <label className="pl-4 text-sm"> Email </label>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="w-full p-4 md:mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-4 md:h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            {errors.email && (
              <span className="text-red-500">El email es obligatorio</span>
            )}
          </div>
          <div className="w-5/12">
            <label className="pl-4 text-sm"> DNI </label>
            <input
              type="number"
              placeholder="DNI"
              {...register('dni', { required: true })}
              className="w-full p-4 md:mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-4 md:h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
          </div>
        </div>
        <div className="flex w-full gap-4 px-3">
          <div className="w-1/2">
            <label className="pl-4 text-sm"> Número </label>
            <input
              type="number"
              placeholder="Número de Teléfono"
              {...register('numero', { required: true })}
              className="w-full p-4 md:mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-4 md:h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
            />
            {errors.numero && (
              <span className="text-red-500">El número es obligatorio</span>
            )}
          </div>
          <div className="w-1/2 ">
            <label className="pl-4 text-sm"> Fecha nacimiento </label>
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              {...register('fecha_nacimiento', { required: true })}
              className="w-full p-4 md:mx-2 text-left transition-all duration-500 border-b shadow-[#644fff] shadow-sm hover:shadow-lg  border-b-[#6aabffe0] h-4 md:h-9 placeholder-[#7a7a7a] bg-[#c9ccce] hover:bg-[#aab4bb] focus:bg-[#aab4bb] rounded-xl opacity-60 focus:shadow-md focus:shadow-[#6aabffe0] focus:outline-[#6aabffe0]"
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
            className="md:w-3/5 h-12 w-24  m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-white bg-[#644fff] border border-transparent rounded-lg group hover:bg-[#503ce7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Cargando...' : 'Guardar'}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between mt-0">
        <button
          className="w-24 h-12 md:w-32  m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-white bg-[#bd3a3ad5] border border-transparent rounded-lg group hover:bg-[#ff5151f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={deleteMyProfile}
        >
          ELIMINAR PERFIL
        </button>
        <div className="m-2">{loading && <LoadingSpinner />}</div>
        <button
          onClick={onClose}
          className="w-24 h-12 md:w-32  m-2 text-md font-medium hover:font-bold tracking-wide hover:tracking-widest transition-all duration-700 text-white bg-[#666666c7] border border-transparent rounded-lg group hover:bg-[#424242d8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
