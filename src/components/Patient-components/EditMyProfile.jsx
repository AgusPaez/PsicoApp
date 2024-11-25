//imports
import React, { useEffect, useState } from 'react';
// import hooks rhf
import { useForm } from 'react-hook-form';
//import services
import { updateMyProfile, deleteProfile } from '../../services/users';
//import context
import { useAuth } from '../../context/AuthProvider';

export const EditMyProfile = ({ profile, onClose }) => {
  //states
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    //set values
    if (profile) {
      reset({
        id: profile._id || '',
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        dni: profile.dni || '',
        email: profile.email || '',
        numero: profile.numero || '',
        obra_social: profile.obra_social || '',
        fecha_nacimiento: profile.fecha_nacimiento.split('T')[0] || '',
      });
      setPreviewImage(profile.imagenUrl || '');
    }
  }, [profile, reset]);

  //on Submit function
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

  //delete profile function
  const deleteMyProfile = async () => {
    try {
      const response = await deleteProfile(profile._id);
      console.log('Perfil eliminado correctamente', response);
      logout();
    } catch (error) {
      console.error('Error al intentar eliminar el perfil', error);
    }
  };
  //preview image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg ">
        <h2 className="mb-4 text-lg font-bold">Editar Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            {previewImage && (
              <img
                src={previewImage}
                alt="Previsualización"
                className="object-cover w-16 h-16 mx-auto rounded-full md:mb-4 md:w-32 md:h-32"
              />
            )}
            <label htmlFor="imagenUrl" className="block text-sm font-medium">
              Foto de perfil
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <label htmlFor="nombre" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              id="nombre"
              className="w-full p-2 border border-gray-300 rounded"
              {...register('nombre', { required: true })}
            />
            {errors.nombre && (
              <span className="text-xs text-red-500">
                El nombre es obligatorio
              </span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="apellido" className="block text-sm font-medium">
              Apellido
            </label>
            <input
              id="apellido"
              className="w-full p-2 border border-gray-300 rounded"
              {...register('apellido', { required: true })}
            />
            {errors.apellido && (
              <span className="text-xs text-red-500">
                El apellido es obligatorio
              </span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                El email es obligatorio
              </span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="numero" className="block text-sm font-medium">
              Número de Teléfono
            </label>
            <input
              id="numero"
              className="w-full p-2 border border-gray-300 rounded"
              {...register('numero', { required: true })}
            />
            {errors.numero && (
              <span className="text-xs text-red-500">
                El número de teléfono es obligatorio
              </span>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="fecha_nacimiento"
              className="block text-sm font-medium"
            >
              Fecha de Nacimiento
            </label>
            <input
              id="fecha_nacimiento"
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              {...register('fecha_nacimiento', { required: true })}
            />
            {errors.fecha_nacimiento && (
              <span className="text-xs text-red-500">
                La fecha de nacimiento es obligatoria
              </span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="obra_social" className="block text-sm font-medium">
              Obra Social
            </label>
            <select
              id="obra_social"
              className="w-full p-2 border border-gray-300 rounded"
              {...register('obra_social')}
            >
              <option value="NO TIENE">NO TIENE</option>
              <option value="SANCOR">SANCOR</option>
              <option value="SANCOR SALUD">SANCOR SALUD</option>
              <option value="PROVINCIA">PROVINCIA</option>
              <option value="SWISS">SWISS</option>
              <option value="OSECAC">OSECAC</option>
              <option value="JERARQUICOS">JERARQUICOS</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800"
              onClick={deleteMyProfile}
            >
              Eliminar Perfil
            </button>
            <button
              type="button"
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
