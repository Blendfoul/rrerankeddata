import React, {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {SectionList, View} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Text, Title, TouchableRipple, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GroupTitle: React.FC<{title: string}> = ({title}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: colors.text,
        padding: 10,
      }}>
      <Title>{title}</Title>
    </View>
  );
};

const Item: React.FC<{title: string}> = ({title}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const navigateToSettings = useCallback(() => {
    navigation.navigate({
      name: 'setting-details',
      params: {
        title,
      },
    });
  }, [navigation, title]);

  return (
    <TouchableRipple onPress={navigateToSettings}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 12.5,
          borderColor: colors.text,
          borderBottomWidth: 1,
        }}>
        <Text>{title}</Text>
        <Icon name={'chevron-right'} size={25} color={colors.text} />
      </View>
    </TouchableRipple>
  );
};

const SettingsComponent: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const data = [
    {
      title: translations.settings.general,
      data: [translations.settings.theme, translations.settings.language],
    },
  ];

  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <Item title={item} />}
      renderSectionHeader={({section}) => <GroupTitle title={section.title} />}
    />
  );
};

export default SettingsComponent;
