// imports
import React from 'react';
// import hooks rhf
import { useForm } from 'react-hook-form';
//import service
import { createProfile } from '../../services/users';

export const AddPatient = ({ close }) => {
  // Validations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      //call service
      await createProfile(data);
      console.log('Paciente agregado exitosamente');
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
            placeholder="Nombre"
            {...register('nombre', { required: true })}
          />
          {errors.nombre && <span>El nombre es obligatorio</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Apellido"
            {...register('apellido', { required: true })}
          />
          {errors.apellido && <span>El apellido es obligatorio</span>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>El email es obligatorio</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register('password', { required: true })}
          />
          {errors.password && <span>La contraseña es obligatoria</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Rol"
            {...register('rol', { required: true })}
          />
          {errors.rol && <span>El rol es obligatorio</span>}
        </div>

        {/* <div>
          <input
            type="url"
            placeholder="URL de la Imagen"
            {...register('imagenUrl')}
          />
        </div> */}

        <div>
          <button type="submit">Crear</button>
          <button type="button" onClick={close}>
            Cancelar
          </button>
        </div>
      </form>
      <button onClick={close}>Cerrar</button>
    </div>
  );
};
