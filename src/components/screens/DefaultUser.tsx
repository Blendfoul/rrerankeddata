import React, {useCallback, useContext, useEffect} from 'react';
import {useRaceContext} from '../../store/RaceContext';
import DriverComponent from '../driver/DriverComponent';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Caption,
  Paragraph,
  Subheading,
  useTheme,
} from 'react-native-paper';
import {LocalizationContext} from '../translations/LocalizationContext';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DefaultUserProps {
  navigation: DrawerNavigationProp<any>;
}

const DefaultUser: React.FC<DefaultUserProps> = ({navigation}) => {
  const [state] = useRaceContext();
  const hasDefault = state.defaultDriver.length > 0;
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();

  useEffect(() => {}, [state.defaultDriver]);

  const redirectSearch = useCallback(
    () => navigation.navigate(translations.user.search),
    [navigation, translations.user.search],
  );

  const componentStyle = StyleSheet.create({
    root: {
      flex: 1,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    information: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    tutorial: {
      marginTop: 10,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      padding: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.text,
    },
    caption: {
      color: colors.text,
      paddingVertical: 10,
    },
    setButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '82.5%',
      marginHorizontal: 10,
      height: 50,
    },
  });

  if (hasDefault) {
    return <DriverComponent username={state.defaultDriver} />;
  }

  return (
    <View style={componentStyle.root}>
      <View style={componentStyle.information}>
        <Icon name={'account'} color={colors.text} size={55} />
        <Subheading>{translations.user.message}</Subheading>
      </View>
      <View style={componentStyle.tutorial}>
        <Caption style={componentStyle.caption}>
          {translations.user.tutorial.message_1}
        </Caption>
        <View style={componentStyle.information}>
          <Caption style={componentStyle.caption}>
            {translations.user.tutorial.message_2}
          </Caption>
          <Icon name={'account-plus'} color={colors.text} size={55} />
        </View>
        <Caption style={componentStyle.caption}>
          {translations.user.tutorial.message_3}
        </Caption>
      </View>
      <Button
        icon={() => <Icon name={'account'} size={25} color={colors.text} />}
        style={componentStyle.setButton}
        contentStyle={{backgroundColor: colors.accent}}
        onPress={redirectSearch}>
        <Paragraph style={{fontSize: 12}}>{translations.user.search}</Paragraph>
      </Button>
    </View>
  );
};

export default DefaultUser;
