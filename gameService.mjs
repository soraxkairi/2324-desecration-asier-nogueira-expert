import axios from "axios";

export async function getData() {
  try {
    const response = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error; 
  }
}


