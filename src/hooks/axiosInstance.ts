import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://game.raceroom.com',
  responseType: 'json',
});

export default axiosInstance;
