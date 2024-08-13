// imports
import axios from 'axios';

//import enviroment variable
const baseUrl = import.meta.env.VITE_API_URL;
//urls
const url = 'contentStudies';
const urlExtends = 'contentStudies/findAll';
//fetch all studies
const fetchAllStudies = async () => {
  try {
    // GET request
    const response = await axios.get(`${baseUrl}${urlExtends}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
//create studies function
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
// update study function
const updateStudy = async (id, data) => {
  try {
    const response = await axios.patch(`${baseUrl}${url}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
// delete study function
const deleteStudy = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}${url}/${id}`);
    return response;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};
export { fetchAllStudies, create, updateStudy, deleteStudy };
