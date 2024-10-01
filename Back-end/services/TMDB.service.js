import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";



  /*
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

*/

export const fetchFromTMDB=async (url)=>{

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ENV_VARS.TMDB_API_KEY,
        }
      };

      const response=await axios.get(url,options);

      if(response.status!==200){
        throw new Error('failed to fetch data from TMDB'+response.statusText)
      }

      return response.data


}