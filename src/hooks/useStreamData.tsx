import { useCallback, useEffect, useState } from 'react';

import { twitch_api_key, twitch_app_token } from '../../app.json';
import { TwitchProfile, TwitchResponse } from '../models/data/Twitch';

const useStreamData = (handle: string) => {
  const [data, setData] = useState<TwitchProfile>();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.twitch.tv/helix/search/channels?query=${handle.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${twitch_app_token}`,
            'client-id': twitch_api_key,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const searchForIdData = (await response.json()) as TwitchResponse;

      const { data } = searchForIdData;

      setData(data.find((user) => user.broadcaster_login === handle.toLowerCase()));
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

export default useStreamData;
