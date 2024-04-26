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

export { fetchAllStudies };
