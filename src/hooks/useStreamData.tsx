import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {twitch_api_key, twitch_app_token} from '../../app.json';

const useStreamData = (handle: string) => {
  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    try {
      const searchForId = await axios(
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
