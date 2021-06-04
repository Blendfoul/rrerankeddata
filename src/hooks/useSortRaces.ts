import {ServerInterface} from '../types/server';
import {useRaceContext} from '../store/RaceContext';
import {useCallback, useEffect, useState} from 'react';
import {ReducerActions} from '../store/StoreReducer';
import {getRaces} from './useAxiosMock';

const useSortRaces = () => {
  const [state, dispatch] = useRaceContext();
  const [races, setRaces] = useState<ServerInterface[]>([]);

  const filterRaces = useCallback(async () => {
    try {
      await getRaces(dispatch);

      const data = state.region.length
        ? state.races
            .filter((server: ServerInterface) =>
              server.Server.Settings.ServerName.includes(state.region),
            )
            .sort(
              //@ts-ignore
              (a: ServerInterface, b: ServerInterface) =>
                b.Server.PlayersOnServer > a.Server.PlayersOnServer,
            )
        : state.races.sort(
            //@ts-ignore
            (a: ServerInterface, b: ServerInterface) =>
              b.Server.PlayersOnServer > a.Server.PlayersOnServer,
          );

      setRaces(data);

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
  }, [dispatch, state.region, state.races, state.refresh, races]);

  useEffect(() => {
    if (state.refresh) {
      filterRaces();
    }
  }, [filterRaces, state.refresh, state.defaultDriver]);

  return {races};
};

export default useSortRaces;
