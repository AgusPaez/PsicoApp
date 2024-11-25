// imports
import axios from 'axios';
//import enviroment variable
const baseUrl = import.meta.env.VITE_API_URL;
const url = 'bond';
const emailUrl = '/email/';

//create bonds function
const create = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Recurso creado exitosamente.');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
//find All bonds function
const findAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}${url}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

//get one bond function
const getBond = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bond:', error);
    throw error;
  }
};

// update appointment function
const updateBond = async (id, data) => {
  try {
    const response = await axios.patch(`${baseUrl}${url}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al borrar el grupo familiar:', error);
    throw error;
  }
};
const deleteBond = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}${url}/${id}`);
    return console.log('user deleted', response.data);
  } catch (error) {
    console.log('Error delete profile', error);
    throw error;
  }
};

export { create, findAll, updateBond, deleteBond, getBond };
