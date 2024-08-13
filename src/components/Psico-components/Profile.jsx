import React, { useEffect, useState } from 'react';

// import services
import { getMyProfile } from '../../services/users';
import { EditMyProfile } from './EditMyProfile';

const data = {
  nombre: 'agustin',
  apellido: 'paez',
  email: 'example',
  rol: 'admin',
  imagenUrl: '',
};
export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState('');
  const [id, setId] = useState('662997258561b18d86577109');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await getMyProfile(id);
        setProfile(profile.data);
      } catch (error) {
        console.log('Error get my profile', error);
      }
    };
    getProfile();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };
  //console.log('DATOS:', profile.data.nombre);
  return (
    <>
      <div>
        <h1>Nombre de la cuenta:</h1>
        <>
          {profile.apellido}, {profile.nombre}{' '}
        </>
        <h1>Email asociado:</h1>
        <> {profile.email}</>
        <h1>ROL:</h1>
        <> {profile.rol} </>
        <img width={100} alt="foto de perfil" src={profile.imagenUrl} />
      </div>
      <div>
        <button onClick={handleEditClick}>Editar Datos personales</button>
      </div>
      <div>
        {isEditing && (
          <EditMyProfile profile={profile} onClose={handleCloseEdit} />
        )}
      </div>
    </>
  );
};
