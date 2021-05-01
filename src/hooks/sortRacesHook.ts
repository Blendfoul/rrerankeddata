import {Server} from '../types/server';
import {RaceStore} from '../store/RaceStore';

const sortRacesHook = async (data: Server[], raceStore: RaceStore) => {
  await raceStore.setRaces(data);

  const sorted = data
    .filter((server: Server) =>
      server.Server.Settings.ServerName.includes(raceStore.Region),
    )
    .sort(
      //@ts-ignore
      (a: Server, b: Server) =>
        b.Server.PlayersOnServer > a.Server.PlayersOnServer,
    );

  await raceStore.setRegionRaces(sorted);
};

export default sortRacesHook;
