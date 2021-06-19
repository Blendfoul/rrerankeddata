import {ServerInterface} from '../types/server';
import {useRaceContext} from '../store/RaceContext';
import {useCallback, useEffect, useState} from 'react';
import {ReducerActions} from '../store/StoreReducer';
import axiosInstanceGenerator from './useAxiosMock';
import axios from 'axios';

const useSortRaces = () => {
  const [state, dispatch] = useRaceContext();
  const [races, setRaces] = useState<ServerInterface[]>([]);

  const filterRaces = useCallback(async () => {
    const source = axios.CancelToken.source();

    try {
      const res = await axiosInstanceGenerator('multiplayer-rating/servers/', {
        cancelToken: source.token,
      });

      const data = state.region.length
        ? res.data.result
            .filter((server: ServerInterface) =>
              server.Server.Settings.ServerName.includes(state.region),
            )
            .sort(
              //@ts-ignore
              (a: ServerInterface, b: ServerInterface) =>
                b.Server.PlayersOnServer > a.Server.PlayersOnServer,
            )
        : res.data.result.sort(
            //@ts-ignore
            (a: ServerInterface, b: ServerInterface) =>
              b.Server.PlayersOnServer > a.Server.PlayersOnServer,
          );

      setRaces(data);

      dispatch({
        type: ReducerActions.SET_RACES,
        payload: res.data.result,
      });
      dispatch({
        type: ReducerActions.SET_REGION_RACES,
        payload: races,
      });
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({
        type: ReducerActions.REFRESH_SERVERS,
        payload: !state.refresh,
      });
    }
  }, [dispatch, state.region, state.refresh, races]);

  useEffect(() => {
    if (state.refresh) {
      filterRaces();
    }
  }, [filterRaces, state.refresh, state.defaultDriver]);

  return {races};
};

export default useSortRaces;
