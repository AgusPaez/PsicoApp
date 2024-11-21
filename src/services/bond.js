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

// //get user (email) function
// const getAppointmentsByEmail = async (email) => {
//   try {
//     const response = await axios.get(`${baseUrl}${url}${emailUrl}${email}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     throw error;
//   }
// };

// // update appointment function
// const updateAppointment = async (id, data) => {
//   try {
//     const response = await axios.patch(`${baseUrl}${url}/${id}`, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error al actualizar la cita:', error);
//     throw error;
//   }
// };

export { create, findAll };
