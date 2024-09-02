//imports
import React, { useEffect, useState } from 'react';
//import services
import { updateMyProfile } from '../../services/users';

export const EditPatients = ({ close, deleted, selected }) => {
  console.log('selected', selected);
  // states
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [apellido, setApellido] = useState('');
  //const [imagen, setImagen] = useState("");

  useEffect(() => {
    if (selected) {
      setId(selected._id || '');
      setNombre(selected.nombre || '');
      setEmail(selected.email || '');
      setApellido(selected.apellido || '');
      //setImagen(selected.imagenUrl || '');
    }
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPatient = {
      id,
      nombre,
      email,
      apellido,
      //imagen
    };
    try {
      const response = await updateMyProfile(updatedPatient.id, updatedPatient);
      console.log('Patient updated successfully', response);
    } catch (error) {
      console.log('failed to update patient', error);
    }
  };

  return (
    <div>
      EditPatients
      <form onSubmit={handleSubmit}>
        <label> Nombre: </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label> Apellido: </label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <label> Email: </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>
      <button onClick={close}>cerrar</button>
      <button onClick={() => deleted(selected._id)}>Eliminar</button>
    </div>
  );
};