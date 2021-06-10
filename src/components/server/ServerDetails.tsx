import React, {useContext, useEffect, useState} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverList from './DriverList';
import RaceDetailsData from './ServerDetailsData';
import {TabBar, TabView} from 'react-native-tab-view';
import {styles} from '../utils/Theme';
import {Dimensions} from 'react-native';
import {useRaceContext} from '../../store/RaceContext';

interface DetailsProps {
  serverName: string;
}

const renderTabBar: React.FC<any> = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'gray'}}
    style={styles.backgroundColorTarget}
  />
);

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const ServerDetails: React.FC<DetailsProps> = ({serverName}) => {
  const {translations} = useContext(LocalizationContext);
  const [state] = useRaceContext();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'data', title: translations.raceDetails.general},
    {key: 'drivers', title: translations.raceDetails.drivers},
  ]);

  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'data':
        return <RaceDetailsData data={serverName} />;
      case 'drivers':
        return <DriverList data={serverName} />;
      default:
        throw new Error();
    }
  };

  useEffect(() => {}, [state.races]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      renderScene={renderScene}
      navigationState={{index, routes}}
      initialLayout={initialLayout}
    />
  );
};

export default ServerDetails;
