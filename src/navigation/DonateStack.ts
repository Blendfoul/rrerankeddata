import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getI18n } from 'react-i18next';
import DonateScreen from '../screens/DonateScreen';
import { MenuHeader } from './Utils';

const { t } = getI18n();

const DonateStack = createNativeStackNavigator({
  initialRouteName: 'Donate',
  screens: {
    Donate: {
      screen: DonateScreen,
      options: {
        title: t('drawer.donate'),
        headerLeft: MenuHeader,
      },
    },
  },
});

export default DonateStack;
