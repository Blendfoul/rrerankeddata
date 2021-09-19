import {useCallback, useEffect, useState} from 'react';
import {useRaceContext} from '../store/RaceContext';
import {Rating} from '../types/rating';
import axios from 'axios';
import {Friend, FriendsProfile} from '../types/friendsProfile';
import axiosInstanceGenerator from './useAxiosMock';

const useFriends = () => {
  const [friends, setFriends] = useState<Rating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [state] = useRaceContext();
  const source = axios.CancelToken.source();

  const getFriends = useCallback(async () => {
    try {
      const response = await axiosInstanceGenerator(
        `users/${state.defaultDriver}/contacts?json`,
        {cancelToken: source.token},
      );

      const profile: FriendsProfile = response.data.context.c;

      const ids = profile.contacts.active.map(
        (driver: Friend) => driver.user_id,
      );

      const friendsData: Rating[] = await Promise.all(
        ids.map(async (id: number) => {
          try {
            const response1 = await axiosInstanceGenerator(
              `multiplayer-rating/user/${id}.json`,
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
  }, [state.defaultDriver]);

  useEffect(() => {
    if (state.defaultDriver) {
      getFriends();
    }

    return () => source.cancel();
  }, [getFriends, state.defaultDriver]);

  return {friends, loading};
};

export default useFriends;
