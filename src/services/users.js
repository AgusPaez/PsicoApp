//imports
import axios from 'axios';
//import enviroment variable
const baseUrl = import.meta.env.VITE_API_URL;

const url = 'users';

// get my profile function  (ver si sigue por id o con el token)
const getMyProfile = async (id) => {
  try {
    const response = axios.get(`${baseUrl}${url}/${id}`);
    return response;
  } catch (error) {
    console.log('Error get my profile', error);
    throw error;
  }
};
// update my profile function
const updateMyProfile = async (id, data) => {
  try {
    const response = await axios.patch(`${baseUrl}${url}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    throw error;
  }
};
export { getMyProfile, updateMyProfile };
