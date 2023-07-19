import axios from "axios";


const URL = 'https://pixabay.com/api/';
const API_KEY = '36214966-0d101d8d6f502ad642532aad3';

export const fetchData = async (strQuery) => { 
  const query = `${URL}?key=${API_KEY}&q=${strQuery}`;
  const responce = await axios.get(query);

  return responce;
}