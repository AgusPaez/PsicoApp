//imports
import axios from 'axios';

//import enviroment variable
const baseUrl = import.meta.env.VITE_API_URL;
//url
const url = 'contentMain';
//id
const id = '/66c5f96f730d89e0c1270b0c';

//fetch content main
const getContent = async () => {
  try {
    //GET request
    const response = await axios.get(`${baseUrl}${url}`);
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
};
const updateContent = async (updatedContent) => {
  try {
    const response = await axios.put(`${baseUrl}${url}${id}`, updatedContent);
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
};

export { getContent, updateContent };
