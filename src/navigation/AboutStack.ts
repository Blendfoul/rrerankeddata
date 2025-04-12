import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getI18n } from 'react-i18next';
import AboutScreen from '../screens/AboutScreen';
import { MenuHeader } from './Utils';

const { t } = getI18n();

const AboutStack = createNativeStackNavigator({
  initialRouteName: 'About',
  screens: {
    About: {
      screen: AboutScreen,
      options: {
        title: t('drawer.about'),
        headerLeft: MenuHeader,
      },
    }
  }
});

export default AboutStack;
