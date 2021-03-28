import React, {useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useRaceStore} from './store/RaceContext';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Observer} from 'mobx-react-lite';
import {regions} from './assets/regions.json';

const AreaPicker: () => Node = () => {
  const raceStore = useRaceStore();

  useEffect(() => {
    raceStore.setAvailableRegions(regions);
  }, [raceStore]);

  return (
    <Observer>
      {() => (
        <TouchableOpacity style={pickerStyle.bar}>
          <Picker
            style={pickerStyle.picker}
            selectedValue={raceStore.Region}
            onValueChange={raceStore.setRegion}>
            <Picker.Item label="All" value={''} />
            {raceStore.AvailableRegions.map((region, index) => (
              <Picker.Item label={region} value={region} key={index} />
            ))}
          </Picker>
        </TouchableOpacity>
      )}
    </Observer>
  );
};

const pickerStyle = StyleSheet.create({
  bar: {
    backgroundColor: '#2f2f2f',
  },
  picker: {
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default AreaPicker;
