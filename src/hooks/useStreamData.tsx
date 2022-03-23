import {useCallback, useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {twitch_api_key, twitch_app_token} from '../../app.json';
import {TwitchProfile, TwitchResponse} from '../models/data/Twitch';

const useStreamData = (handle: string) => {
  const [data, setData] = useState<TwitchProfile>();

  const fetchData = useCallback(async () => {
    try {
      const searchForId: AxiosResponse<TwitchResponse> = await axios(
        `https://api.twitch.tv/helix/search/channels?query=${handle.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${twitch_app_token}`,
            'client-id': twitch_api_key,
          },
        },
      );

      const {data} = searchForId.data;

      setData(
        data.find(user => user.broadcaster_login === handle.toLowerCase()),
      );
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return {data};
};

export default useStreamData;
