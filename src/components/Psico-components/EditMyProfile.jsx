import React, { useEffect, useState } from 'react';
import { updateMyProfile } from '../../services/users';

export const EditMyProfile = ({ profile, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (profile) {
      setId(profile._id || '');
      setNombre(profile.nombre || '');
      setApellido(profile.apellido || '');
      setEmail(profile.email || '');
      setRol(profile.rol || '');
      setImagenUrl(profile.imagenUrl || '');
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...(nombre && { nombre }),
      ...(apellido && { apellido }),
      ...(email && { email }),
      ...(rol && { rol }),
      ...(imagenUrl && { imagenUrl }),
    };

    try {
      const updatedProfile = await updateMyProfile(id, data);
      console.log('Profile updated successfully:', updatedProfile);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />

        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Apellido"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="text"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          placeholder="Rol"
        />

        {/* <input
          type="text"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          placeholder="URL de Imagen"
        /> */}

        <button type="submit">Guardar</button>
      </form>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
