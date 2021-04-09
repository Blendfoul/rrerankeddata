import React, {useContext} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import {TouchableOpacity} from 'react-native';
import {styles} from '../utils/Theme';
import {Picker} from '@react-native-picker/picker';
import {languages} from '../translations/values/supportedLanguages.json';

const LanguagePicker = () => {
  const context = useContext(LocalizationContext);

  return (
    <TouchableOpacity style={[styles.backgroundColor]}>
      <Picker
        style={styles.title}
        selectedValue={context.appLanguage}
        onValueChange={context.setAppLanguage}>
        {languages.map((l, i) => (
          <Picker.Item label={l.name} value={l.value} key={i} />
        ))}
      </Picker>
    </TouchableOpacity>
  );
};

export default LanguagePicker;
