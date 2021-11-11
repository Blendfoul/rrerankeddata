import {useEffect, useState} from 'react';
import {useRaceSelector} from '../store/hooks';
import {dataSelector} from '../store/slices/General';
import {Layout, Track} from '../models/data/General';

const useTrack = (trackId: number) => {
  const {tracks} = useRaceSelector(dataSelector);
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
        const {layouts} = tracks[track] as Track;
        trackData = layouts.find((value: Layout) => value.Id === trackId);
        if (trackData !== undefined) {
          setTrack(tracks[track]);
          break;
        }
      }
    }

    setLayout(trackData as Layout);
  }, []);

  return {layout, trackInfo};
};

export default useTrack;
