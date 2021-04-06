import React, {useContext, useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import {styles} from '../utils/Theme';
import {Dimensions} from 'react-native';
import DriverDetails from './DriverDetails';
import DriverHistory from './DriverHistory';
import {LocalizationContext} from '../translations/LocalizationContext';
import {AdMobBanner} from 'react-native-admob';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.backgroundColor}
    style={{backgroundColor: 'gray'}}
  />
);

const DriverComponent = ({username, navigation}) => {
  const {translations} = useContext(LocalizationContext);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'data', title: translations.profile.info},
    {key: 'races', title: translations.profile.races},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'data':
        return <DriverDetails username={username} />;
      case 'races':
        return <DriverHistory username={username} navigation={navigation} />;
      default:
        return null;
    }
  };

  const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
  };

  return (
    <>
      <TabView
        lazy={true}
        onIndexChange={setIndex}
        renderScene={renderScene}
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        initialLayout={initialLayout}
      />
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-3693871231832720/7421606479"
        onAdFailedToLoad={error => console.error(error)}
      />
    </>
  );
};

export default DriverComponent;
