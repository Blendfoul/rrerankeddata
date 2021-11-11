import axios, {AxiosResponse} from 'axios';
import {Rating} from '../models/data/Ranked';

module.exports = async () => {
  const response: AxiosResponse<Rating[]> = await axios(
    'https://game.raceroom.com/multiplayer-rating/ratings.json',
  );

  console.log(`[Ratings.js] -> ${response.data[0]}`);

  return response.data;
};
