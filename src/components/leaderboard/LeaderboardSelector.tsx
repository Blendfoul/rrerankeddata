import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import {FlatList, SectionList, View} from 'react-native';
import {ComboState} from './LeaderboardComponent';
import {Title} from 'react-native-paper';
import ClassRow from './ClassRow';
import TrackRow from './TrackRow';

interface genericCombo {
  value: number;
  label: string;
  options: data[];
}

interface trackCombo {
  title: string;
  data: data[];
}

interface data {
  text: string;
  image: string;
  value: number;
}

type State = genericCombo[] | undefined;
type TrackState = trackCombo[] | undefined;

interface LeaderboardSelectorProps {
  data: [ComboState, React.Dispatch<SetStateAction<ComboState>>];
}

const LeaderboardSelector: React.FC<LeaderboardSelectorProps> = ({data}) => {
  const [carClass, setCarClass] = useState(undefined as State);
  const [track, setTrack] = useState(undefined as TrackState);
  const [loading, setLoading] = useState(true);

  const getCombos = useCallback(async () => {
    setLoading(true);
    const source = axios.CancelToken.source();

    try {
      const response = await axios('leaderboard/?json', {
        cancelToken: source.token,
      } as AxiosRequestConfig);

      const classes = response.data.context.c.filters.find(
        (it: {name: string}) => it.name === 'car_class',
      )?.options;

      const tracks = response.data.context.c.filters
        .find((it: {name: string}) => it.name === 'track')
        ?.options.map((it: genericCombo) => {
          return {title: it.label, data: it.options};
        });

      setCarClass(classes);
      setTrack(tracks);
    } catch (e) {
      console.error('[LEADERBOARD_SELECTOR] ' + e);
    }

    setLoading(false);
    return () => source.cancel();
  }, []);

  useEffect(() => {
    getCombos();
  }, [getCombos]);

  return loading ? null : (
    <>
      <View style={{flex: 1}} collapsable>
        <FlatList
          data={carClass}
          renderItem={({item}) => (
            <ClassRow
              item={item}
              setData={data[1]}
              classId={data[0]?.classId}
            />
          )}
          keyExtractor={(item, index) => `class-${index}`}
        />
      </View>
      <View
        style={{flex: 1, borderTopColor: 'white', borderTopWidth: 2}}
        collapsable>
        <SectionList
          sections={track!}
          keyExtractor={(item, index) => `track-${index}`}
          renderItem={({item}) => (
            <TrackRow
              track={data[0]?.trackId as number}
              item={item}
              setData={data[1]}
            />
          )}
          renderSectionHeader={({section}) => (
            <Title style={{fontSize: 15, color: 'white', textAlign: 'center'}}>
              {section.title}
            </Title>
          )}
        />
      </View>
    </>
  );
};

export default LeaderboardSelector;
