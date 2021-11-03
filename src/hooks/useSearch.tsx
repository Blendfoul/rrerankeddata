import axios, {AxiosResponse} from 'axios';
import {SearchUser} from '../models/data/User';
import {Rating} from '../models/data/Ranked';
import {useSelector} from 'react-redux';
import {ratingSelector} from '../store/slices/General';
import {useEffect, useState} from 'react';

const useSearch = (name: string) => {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const ratings = useSelector(ratingSelector);
  const token = axios.CancelToken.source();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<SearchUser[]> = await axios(
        `https://game.raceroom.com/search?query=${name}`,
        {
          cancelToken: token.token,
        },
      );

      if (response.data.length !== 0) {
        setUsers(response.data);
      } else {
        const data = ratings.find(
          (driver: Rating) =>
            driver.Username.toLowerCase() === name.toLowerCase() ||
            driver.Fullname.toLowerCase() === name.toLowerCase(),
        );

        if (data !== undefined) {
          setUsers([
            {
              name: data.Fullname,
              image: `https://game.raceroom.com/game/user_avatar/${data.UserId}`,
              meta_data: {slug: data.Username},
              type: 'user',
            },
          ]);
        }
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    return () => token.cancel();
  }, [name]);

  return {users, loading};
};

export default useSearch;
