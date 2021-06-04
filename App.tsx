import React, {useCallback, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import ServerNavigator from './src/components/navigators/ServerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import RaceLink from './RaceLink';
import {LocalizationContext} from './src/components/translations/LocalizationContext';
import {View} from 'react-native';
import {styles} from './src/components/utils/Theme';
import {useNetInfo} from '@react-native-community/netinfo';
import TextContainer from './src/components/utils/TextContainer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './src/components/drawer/DrawerContent';
import './setTextPresets';
import {useRaceContext} from './src/store/RaceContext';
import {ReducerActions} from './src/store/StoreReducer';
import LoadingActivity from './src/components/utils/LoadingActivity';
import UserNavigator from './src/components/navigators/UserNavigator';
import SearchNavigator from './src/components/navigators/SearchNavigator';
import AboutNavigator from './src/components/navigators/AboutNavigator';
import FriendsNavigator from './src/components/navigators/FriendsNavigator';
import RankingNavigator from './src/components/navigators/RankingNavigator';
import useR3EData from './src/hooks/useR3EData';

const drawerNavigator = createDrawerNavigator();

const App: React.FC<any> = () => {
  const [state, dispatch] = useRaceContext();
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  const isConnected = useNetInfo();
  const {loading} = useR3EData();

  const getRatings = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('defaultDriver');
      const region = await AsyncStorage.getItem('selectedRegion');

      if (region !== null) {
        dispatch({
          type: ReducerActions.SET_REGION,
          payload: region,
        });
      }
      if (value !== null) {
        dispatch({
          type: ReducerActions.SET_DEFAULT_DRIVER,
          payload: value,
        });
      }
    } catch (e) {
      console.error('[Ratings] ' + e.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getRatings();
    SplashScreen.hide();
  }, [isConnected.isConnected, getRatings]);

  useEffect(() => {
    const appStart = async () => initializeAppLanguage();

    appStart();
  }, [initializeAppLanguage]);

  if (loading) {
    return <LoadingActivity title={translations.loading.start} />;
  }

  if (!isConnected.isConnected) {
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
      </drawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
