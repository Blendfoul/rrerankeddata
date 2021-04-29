import React, {Dispatch, SetStateAction, useCallback} from 'react';
import {ComboState} from './LeaderboardComponent';
import {TouchableOpacity, View} from 'react-native';
import {Paragraph} from 'react-native-paper';
import CarClass from '../utils/CarClass';

interface ClassRowProps {
  item: {
    value: number;
    label: string;
  };
  classId: number | undefined;
  setData: Dispatch<SetStateAction<ComboState>>;
}

const ClassRow: React.FC<ClassRowProps> = ({item, classId, setData}) => {
  const setClassId = useCallback(
    (itemValue: number) => {
      setData(state => {
        return {
          ...state!,
          classId: itemValue,
        };
      });
    },
    [setData],
  );

  return (
    <TouchableOpacity
      onPress={() => setClassId(item.value)}
      style={{
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: item.value === classId ? '#4d4d4d' : '#2f2f2f',
      }}>
      <Paragraph style={{flex: 1, color: 'white'}}>{item.label}</Paragraph>
      <View style={{flex: 0, alignItems: 'center', justifyContent: 'center'}}>
        <CarClass classes={[item.value]} size={45} imgSize={'small'} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ClassRow);
