import { use, useCallback, useEffect, useState } from 'react';

import { Rating } from '../models/data/Ranked';

const useFriends = (userId: number) => {
  const source = new AbortController();

  const getFriends = useCallback(async (AbortController: AbortController) => {
    if (userId === -1) {
      return;
    }

    try {
      const response = await fetch(`https://game.raceroom.com/users/${userId}/contacts?json`, {
        signal: AbortController.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      const profile = data.context.c;

      const ids = profile.contacts.active.map((driver) => driver.user_id);

      const friendsData: Rating[] = await Promise.all(
        ids.map(async (id: number) => {
          try {
            const response1 = await fetch(
              `https://game.raceroom.com/multiplayer-rating/user/${id}.json`,
              {
                signal: AbortController.signal,
              },
            );

            if (!response1.ok) {
              throw new Error('Failed to fetch data');
            }

            const data1 = (await response1.json()) as Rating;

            return data1;
          } catch (e) {}
        }),
      );

      return friendsData.filter((f) => f !== undefined);
    } catch {}
  }, []);

  const friends = use(getFriends(source));

  useEffect(() => {
    return () => {
      source.abort();
    };
  }, [userId]);

  return { friends, loading: false };
};

export default useFriends;
