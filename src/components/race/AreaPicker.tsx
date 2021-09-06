import React, {useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import {useTheme} from 'react-native-paper';

const AreaPicker: React.FC<any> = () => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();

  const handleRegionChange = (region: string) => {
    dispatch({
      type: ReducerActions.SET_REGION,
      payload: region,
    });
    dispatch({
      type: ReducerActions.REFRESH_SERVERS,
      payload: !state.refresh,
    });
  };

  const pickerStyle = StyleSheet.create({
    bar: {
      backgroundColor: colors.background,
    },
    picker: {
      color: colors.text,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
  });

  return (
    <TouchableOpacity style={pickerStyle.bar}>
      <Picker
        style={pickerStyle.picker}
        selectedValue={state.region}
        onValueChange={handleRegionChange}>
        {translations.race.regions.map(
          (region: {name: string; value: string}, index: number) => (
            <Picker.Item label={region.name} value={region.value} key={index} />
          ),
        )}
      </Picker>
    </TouchableOpacity>
  );
};

export default AreaPicker;
