import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {styles} from './Theme';
import {IconButton, useTheme} from 'react-native-paper';
import React from 'react';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';

const ScheduleComponent: React.FC = () => {
  const [state, dispatch] = useRaceContext();
  const {colors} = useTheme();

  const date = new Date();
  const handleSchedule = () => {
    dispatch({
      type: ReducerActions.SET_SCHEDULE,
      payload: !state.schedule,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={state.schedule}
      onRequestClose={handleSchedule}>
      <View
        style={[
          styles.column,
          styles.justifyCenter,
          styles.alignCenter,
          {backgroundColor: colors.background},
        ]}>
        <IconButton onPress={handleSchedule} icon={'close'} />
        <View style={[styles.column]}>
          <ScrollView horizontal>
            <Image
              source={{
                uri: `https://evosupport.raceroom.com/index.php/apps/files_sharing/publicpreview/xgT5EjNqkiiM8C3?x=1920&y=1080&a=true&file=schedule%2520post.png&scalingup=0&c=${date.getDate()}_${
                  date.getHours() > 12 ? '1' : '0'
                }`,
                cache: 'reload',
              }}
              resizeMode={'contain'}
              style={componentStyle.schedule}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const componentStyle = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  schedule: {
    width: 1000,
    height: Dimensions.get('window').height,
  },
});

export default ScheduleComponent;
