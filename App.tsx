import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import ServerNavigator from './src/components/navigators/ServerNavigator';
import RaceLink from './RaceLink';
import {LocalizationContext} from './src/components/translations/LocalizationContext';
import {View} from 'react-native';
import {styles} from './src/components/utils/Theme';
import TextContainer from './src/components/utils/TextContainer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './src/components/drawer/DrawerContent';
import './setTextPresets';
import UserNavigator from './src/components/navigators/UserNavigator';
import SearchNavigator from './src/components/navigators/SearchNavigator';
import AboutNavigator from './src/components/navigators/AboutNavigator';
import FriendsNavigator from './src/components/navigators/FriendsNavigator';
import RankingNavigator from './src/components/navigators/RankingNavigator';
import useInitApp from './src/hooks/useInitApp';
import DonateNavigator from './src/components/navigators/DonateNavigator';

const drawerNavigator = createDrawerNavigator();

const App: React.FC<any> = () => {
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  const {loading, isConnected} = useInitApp();

  useEffect(() => {
    const appStart = async () => {
      await initializeAppLanguage();
    };

    appStart();
  }, [initializeAppLanguage]);

  if (loading) {
    return null;
  }

  if (!isConnected) {
    return (
      <View style={styles.loadingContainer}>
        <TextContainer
          title={<Icon name={'exclamation'} size={100} color={'#fff'} />}
          text={translations.noConnection}
        />
      </View>
    );
  }

  return (
    <NavigationContainer linking={RaceLink}>
      <drawerNavigator.Navigator
        drawerContent={props => <DrawerContent {...props} />}>
        <drawerNavigator.Screen
          name={translations.navigation.server}
          component={ServerNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.user}
          component={UserNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.search}
          component={SearchNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.friends}
          component={FriendsNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.ranking}
          component={RankingNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.about}
          component={AboutNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.donate}
          component={DonateNavigator}
        />
      </drawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
