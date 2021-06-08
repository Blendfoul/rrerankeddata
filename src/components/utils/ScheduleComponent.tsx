import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {styles} from './Theme';
import {Button} from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';

const ScheduleComponent: React.FC = () => {
  const [state, dispatch] = useRaceContext();
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
          styles.backgroundColorTarget,
        ]}>
        <Button
          onPress={handleSchedule}
          style={[
            styles.column,
            styles.closeButton,
            styles.alignCenter,
            {flex: 0},
          ]}>
          <AntIcon color={'white'} name={'close'} size={25} />
        </Button>
        <View style={[styles.column]}>
          <ScrollView horizontal>
            <Image
              source={{
                uri: `https://evosupport.raceroom.com/index.php/apps/files_sharing/publicpreview/tne8CWb45oQmcTx?file=/schedule%20post.png&x=1920&y=1080&a=true&c=${date.getDate()}_${
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
