import React, {useCallback, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  ActionSheetIOS,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import {Paragraph, useTheme} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';

const AreaPicker: React.FC<any> = () => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();

  const handleRegionChange = useCallback(
    (region: string) => {
      dispatch({
        type: ReducerActions.SET_REGION,
        payload: region,
      });
      dispatch({
        type: ReducerActions.REFRESH_SERVERS,
        payload: !state.refresh,
      });
    },
    [dispatch, state.refresh],
  );

  const pickerStyle = StyleSheet.create({
    bar: {
      backgroundColor: colors.background,
    },
    barIos: {
      backgroundColor: colors.background,
      paddingVertical: 15,
      paddingHorizontal: 15,
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
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

  const createActionSheet = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          translations.race.cancel,
          ...translations.race.regions.map(value => value.name),
        ],
        cancelButtonIndex: 0,
      },
      index =>
        index !== 0
          ? handleRegionChange(translations.race.regions[index - 1].value)
          : null,
    );
  }, [handleRegionChange, translations.race.cancel, translations.race.regions]);

  return Platform.OS === 'ios' ? (
    <TouchableOpacity style={pickerStyle.barIos} onPress={createActionSheet}>
      <Paragraph>{state.region}</Paragraph>
      <MaterialCommunityIcon
        name={'chevron-down'}
        color={colors.text}
        size={25}
        direction={'ltr'}
      />
    </TouchableOpacity>
  ) : (
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
