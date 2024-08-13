import React, { useEffect, useState } from 'react';

// import services
import { getMyProfile } from '../../services/users';

const data = {
  nombre: 'agustin',
  apellido: 'paez',
  email: 'example',
  rol: 'admin',
  imagenUrl: '',
};
export const Profile = () => {
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
        <img alt="foto de perfil" src={profile.imagenUrl} />
      </div>
      <div>
        <button>Editar Datos personales</button>
      </div>
    </>
  );
};
