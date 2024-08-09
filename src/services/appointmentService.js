// imports
import axios from 'axios';

//import enviroment variable
const baseUrl = import.meta.env.VITE_API_URL;
const url = 'appointment';
//create appointment function
const create = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Recurso creado exitosamente.');
    } else {
      console.error('Error al crear el recurso.');
    }
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
//find All Appointment function
const findAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}${url}/findAll`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export { create, findAll };
