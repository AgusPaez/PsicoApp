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
export { getMyProfile };
