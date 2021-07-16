import {useRaceContext} from '../store/RaceContext';
import {useEffect, useState} from 'react';

interface Layout {
  Id: number;
  MaxNumberOfVehicles: number;
  Name: string;
  Track: number;
}

interface Track {
  Name: string;
  Id: number;
  layouts: Layout[];
}

const useTrackInfo = (trackId: number) => {
  const [state] = useRaceContext();
  const {tracks} = state.r3e_data;
  const [layout, setLayout] = useState<Layout>({
    Track: 0,
    MaxNumberOfVehicles: 0,
    Name: '',
    Id: 0,
  });
  const [trackInfo, setTrack] = useState<Track>({
    Name: '',
    Id: 0,
    layouts: [],
  });

  useEffect(() => {
    let trackData: Layout | undefined;

    for (const track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        //@ts-ignore
        const {layouts} = tracks[track] as Track;

        trackData = layouts.find((value: Layout) => value.Id === trackId);
        if (trackData !== undefined) {
          //@ts-ignore
          setTrack(tracks[track]);
          break;
        }
      }
    }

    setLayout(trackData as Layout);
  }, [trackId, tracks]);

  return {layout, trackInfo};
};

export default useTrackInfo;
