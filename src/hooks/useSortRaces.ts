import {ServerInterface} from '../types/server';
import {useRaceContext} from '../store/RaceContext';
import {useCallback, useEffect, useState} from 'react';
import {ReducerActions} from '../store/StoreReducer';

const useSortRaces = () => {
  const [state, dispatch] = useRaceContext();
  const [races, setRaces] = useState<ServerInterface[]>([]);

  const filterRaces = useCallback(async () => {
    console.log(state.region);

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
  }, [state.region, state.races, dispatch, races]);

  useEffect(() => {
    filterRaces();
  }, [filterRaces]);

  return {races};
};

export default useSortRaces;
