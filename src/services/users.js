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
// find patients function
const findPatients = async () => {
  try {
    const response = await axios.get(`${baseUrl}${url}`);
    return response.data;
  } catch (error) {
    console.log('Error get all patients', error);
    throw error;
  }
};
// delete profile/ my profile function
const deleteProfile = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}${url}/${id}`);
    return console.log('user deleted', response.data);
  } catch (error) {
    console.log('Error delete profile', error);
    throw error;
  }
};

//create profile/patient function
const createProfile = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data);
    return console.log('user created', response.data);
  } catch (error) {
    console.log('Error create profile', error);
    throw error;
  }
};
export {
  getMyProfile,
  updateMyProfile,
  findPatients,
  deleteProfile,
  createProfile,
};
