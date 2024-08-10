import React from 'react';
import { useForm } from 'react-hook-form';
import { create } from '../../services/StudiesService';
const EditAdd = ({ onClose }) => {
  // validations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await create(data);
      console.log('Estudio agregado exitosamente');
    } catch (error) {
      console.error('Error al conectarse con la API:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Nombre de carrera / curso"
            {...register('titulo', { required: true })}
          />
          {errors.titulo && <span>El nombre del curso es obligatorio</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Nombre de institución"
            {...register('institucion', { required: true })}
          />
          {errors.institucion && (
            <span>El nombre de la institución es obligatorio</span>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Año de egreso"
            {...register('anio', {
              required: true,
              min: 1900,
              max: new Date().getFullYear(),
            })}
          />
          {errors.anio && (
            <span>
              {errors.anio.type === 'required' &&
                'El año de egreso es obligatorio'}
              {errors.anio.type === 'min' && 'El año no puede ser menor a 1900'}
              {errors.anio.type === 'max' &&
                'El año no puede ser mayor al actual'}
            </span>
          )}
        </div>

        <div>
          <button type="submit">Crear</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default EditAdd;
