import axios from 'axios';
// @ts-ignore
import { API_KEY } from 'react-native-dotenv';

const movieDB = axios.create({
    baseURL: `https://api.themoviedb.org/3/movie`,
    params: {
        api_key: API_KEY || 'your_api_key_.env',
        language: 'es-ES'
    }
});

export default movieDB;

