//imports
import React, { useEffect } from 'react';
//import hooks rhf
import { useForm } from 'react-hook-form';
//import services
import { create } from '../../services/StudiesService';

const EditAdd = ({ onClose }) => {
  //rhf
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //create study
  const onSubmit = async (data) => {
    try {
      //call service and send data
      await create(data);
      console.log('Estudio agregado exitosamente');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al conectarse con la API:', error);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 transition-all duration-300 transform scale-100 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Agregar Estudio</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre de carrera / curso"
              {...register('titulo', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.titulo && (
              <span className="text-xs text-red-500">
                El nombre del curso es obligatorio
              </span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre de institución"
              {...register('institucion', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.institucion && (
              <span className="text-xs text-red-500">
                El nombre de la institución es obligatorio
              </span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Año de egreso"
              {...register('anio', {
                required: true,
                min: 1900,
                max: new Date().getFullYear(),
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.anio && (
              <span className="text-xs text-red-500">
                {errors.anio.type === 'required' &&
                  'El año de egreso es obligatorio'}
                {errors.anio.type === 'min' &&
                  'El año no puede ser menor a 1900'}
                {errors.anio.type === 'max' &&
                  'El año no puede ser mayor al actual'}
              </span>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 transition-all duration-300 bg-gray-400 rounded hover:bg-gray-500 hover:tracking-widest"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] hover:tracking-widest transition-all duration-300"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdd;
