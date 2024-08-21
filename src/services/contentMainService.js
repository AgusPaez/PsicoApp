//imports
import axios from 'axios';

//import enviroment variable
const baseUrl = import.meta.env.VITE_API_URL;
//url
const url = 'contentMain';

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

export { getContent };
