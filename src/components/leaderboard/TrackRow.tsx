import React, {SetStateAction, useCallback} from 'react';
import {ComboState} from './LeaderboardComponent';
import {Image, TouchableOpacity} from 'react-native';
import {Paragraph} from 'react-native-paper';

interface RowProps {
  item: data;
  track: number;
  setData: React.Dispatch<SetStateAction<ComboState>>;
}

interface data {
  text: string;
  image: string;
  value: number;
}

const TrackRow: React.FC<RowProps> = ({item, setData, track}) => {
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
        backgroundColor: item.value === track ? '#4d4d4d' : '#2f2f2f',
      }}>
      <Paragraph style={{flex: 1, color: 'white'}}>{item.text}</Paragraph>
      <Image
        style={{width: 50, height: 50, flex: 0}}
        source={{uri: item.image}}
      />
    </TouchableOpacity>
  );
};

export default React.memo(TrackRow);
