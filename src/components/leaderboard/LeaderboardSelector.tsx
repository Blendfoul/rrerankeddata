import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios, {AxiosRequestConfig} from 'axios';
import {Image, SectionList, TouchableOpacity, View} from 'react-native';
import {styles} from '../utils/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ComboState} from './LeaderboardComponent';
import {Paragraph, Title} from 'react-native-paper';

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

interface RowProps {
  item: data;
  setData: React.Dispatch<SetStateAction<ComboState>>;
}

const LayoutRow: React.FC<RowProps> = ({item, setData}) => {
  const setTrackId = useCallback(
    (itemValue: number) => {
      setData(state => {
        return {
          ...state!,
          trackId: itemValue,
        };
      });
    },
    [setData],
  );

  return (
    <TouchableOpacity
      onPress={() => setTrackId(item.value)}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      <Paragraph style={{flex: 1, color: 'white'}}>{item.text}</Paragraph>
      <Image
        style={{width: 50, height: 50, flex: 0}}
        source={{uri: item.image}}
      />
    </TouchableOpacity>
  );
};

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

      await AsyncStorage.multiSet([
        ['CAR_CLASS', JSON.stringify(classes)],
        ['TRACKS', JSON.stringify(tracks)],
      ]);

      setCarClass(classes);
      setTrack(tracks);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    return () => source.cancel();
  }, []);

  const getCombosFromCache = useCallback(async () => {
    setLoading(true);

    const result = await AsyncStorage.multiGet(['CAR_CLASS', 'TRACKS']);

    if (result) {
      setCarClass(JSON.parse(result[0][1]!));
      setTrack(JSON.parse(result[1][1]!));
    } else {
      await getCombos();
    }

    setLoading(false);
  }, [getCombos]);

  useEffect(() => {
    getCombos();
  }, [getCombos]);

  const setClassId = useCallback(
    (itemValue: number) => {
      data[1](state => {
        return {
          ...state!,
          classId: itemValue,
        };
      });
    },
    [data],
  );

  return loading === true ? null : (
    <>
      <View style={[styles.container, {flex: 0}]}>
        <Picker
          style={[styles.title, {flex: 1}]}
          onValueChange={setClassId}
          selectedValue={data[0]?.classId!}>
          {carClass?.map((it, index) => (
            <Picker.Item
              color={'white'}
              key={`class-${index}`}
              label={it.label}
              value={it.value}
            />
          ))}
        </Picker>
      </View>
      <View>
        <SectionList
          sections={track!}
          keyExtractor={(item, index) => `track-${index}`}
          renderItem={({item}) => <LayoutRow item={item} setData={data[1]} />}
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
