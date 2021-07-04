import axios from 'axios';

const axiosInstanceGenerator = axios.create({
  baseURL: 'https://game.raceroom.com/',
});

export default axiosInstanceGenerator;
