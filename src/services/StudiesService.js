// imports
import axios from 'axios';

//import enviroment variable
const baseUrl = import.meta.env.VITE_API_URL;
//fetch all studies
const fetchAllStudies = async () => {
  const url = 'contentStudies/findAll';
  try {
    // GET request
    const response = await axios.get(`${baseUrl}${url}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
//create appointment function
const create = async (data) => {
  const url = 'contentStudies';
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

export { fetchAllStudies, create };
