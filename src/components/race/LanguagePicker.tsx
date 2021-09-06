import React, {useContext} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import DropDownPicker from 'react-native-dropdown-picker';
import Languages from './Languages';
import {StyleSheet} from 'react-native';

const LanguagePicker = () => {
  const context = useContext(LocalizationContext);

  return (
    <DropDownPicker
      items={Languages}
      defaultValue={context.appLanguage}
      onChangeItem={item => context.setAppLanguage(item.value)}
      containerStyle={{height: 53.5}}
      style={componentStyle.picker}
      dropDownStyle={componentStyle.dropdown}
    />
  );
};

const componentStyle = StyleSheet.create({
  dropdown: {
    
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 0,
  },
  picker: {
    
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 0,
  },
});

export default LanguagePicker;
