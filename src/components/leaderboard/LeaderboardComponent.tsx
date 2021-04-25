import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from '../utils/Theme';
import LeaderboardSelector from './LeaderboardSelector';

export interface Combo {
  trackId: number;
  classId: number;
}

export type ComboState = Combo | null;

const LeaderboardComponent: React.FC<any> = () => {
  const [selectedCombo, setCombo] = useState(null as ComboState);

  return (
    <View style={[styles.column, styles.backgroundColor]}>
      <LeaderboardSelector data={[selectedCombo, setCombo!]} />
    </View>
  );
};

export default LeaderboardComponent;
