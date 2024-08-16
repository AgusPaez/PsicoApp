import React, { useEffect, useState } from 'react';

// import services
import { getMyProfile } from '../../services/users';
import { EditMyProfile } from './EditMyProfile';

//import context
import { useAuth } from '../../context/AuthProvider';

export const Profile = () => {
  console.log('Profile component rendered');
  //states
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState('');
  const [id, setId] = useState('');
  const { dataLogin } = useAuth();

  useEffect(() => {
    if (dataLogin._id !== id) {
      setId(dataLogin._id);
    }
  }, [dataLogin._id, id]);
  console.log(dataLogin);

  //1option

  // useEffect(() => {
  //   if (id) {
  //     const getProfile = async () => {
  //       try {
  //         const profile = await getMyProfile(id);
  //         setProfile(profile.data);
  //       } catch (error) {
  //         console.log('Error get my profile', error);
  //       }
  //     };
  //     getProfile();
  //   }
  // }, [id]);

  useEffect(() => {
    setProfile(dataLogin);
  }, [dataLogin._id, id]);

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
