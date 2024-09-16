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
  const [profile, setProfile] = useState({});
  const [id, setId] = useState('');
  const { dataLogin } = useAuth();

  useEffect(() => {
    if (dataLogin._id !== id) {
      setId(dataLogin._id);
    }
  }, [dataLogin._id, id]);
  console.log(dataLogin);

  useEffect(() => {
    setProfile(dataLogin);
  }, [dataLogin._id, id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center h-96 my-28">
      <div className="absolute w-full max-w-lg p-8 text-center bg-white rounded-lg shadow-xl">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            className="object-cover w-32 h-32 mx-auto mb-4 transition-transform duration-500 ease-in-out rounded-full shadow-md hover:scale-125"
            alt="foto de perfil"
            src={profile.imagenUrl}
          />
        </div>
        <h1 className="mb-2 text-2xl font-bold transition-all duration-500 ease-in-out hover:tracking-wide">
          {profile.apellido}, {profile.nombre}
        </h1>
        <p className="mb-4 text-lg text-gray-700 transition-all duration-300 ease-in-out hover:tracking-wide">
          {profile.email}
        </p>

        <button
          onClick={handleEditClick}
          className="px-6 py-2 transition-all duration-500 ease-in-out hover:tracking-wide text-white bg-[#644fff] rounded-lg hover:bg-[#503ce7]"
        >
          Editar Datos personales
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pb-28">
          <div className="flex items-center justify-center w-full max-w-md mt-32 rounded-lg shadow-lg ">
            <EditMyProfile profile={profile} onClose={handleCloseEdit} />
          </div>
        </div>
      )}
    </div>
  );
};
