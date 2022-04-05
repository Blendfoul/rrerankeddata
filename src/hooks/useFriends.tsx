import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Rating} from '../models/data/Ranked';

const useFriends = (userId: number) => {
  const [friends, setFriends] = useState<Rating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();

  const getFriends = useCallback(async () => {
    if (userId === -1) {
      return;
    }

    try {
      const response = await axios(
        `https://game.raceroom.com/users/${userId}/contacts?json`,
        {cancelToken: source.token},
      );

      const profile = response.data.context.c;

      const ids = profile.contacts.active.map(driver => driver.user_id);

      const friendsData: Rating[] = await Promise.all(
        ids.map(async (id: number) => {
          try {
            const response1 = await axios(
              `https://game.raceroom.com/multiplayer-rating/user/${id}.json`,
              {
                cancelToken: source.token,
              },
            );

            return response1.data;
          } catch (e) {}
        }),
      );

      setFriends(friendsData.filter(f => f !== undefined));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getFriends();

    return () => source.cancel();
  }, [userId]);

  return {friends, loading};
};

export default useFriends;
