//imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import services
import { updateMyProfile, deleteProfile } from '../../services/users';
//import context
import { useAuth } from '../../context/AuthProvider';

export const EditMyProfile = ({ profile, onClose }) => {
  //states
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [id, setId] = useState('');
  //context
  const { logout } = useAuth();

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
  const deleteMyProfile = async () => {
    try {
      const response = await deleteProfile(id);
      console.log('Profile deleted successfully', response);
      logout();
    } catch (error) {
      console.log('error al intentar borrar mi perfil', error);
      throw error;
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
      <button className="bg-red-600" onClick={deleteMyProfile}>
        ELIMINAR PERFIL
      </button>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
