import React, {useContext, useEffect, useState} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverList from './DriverList';
import RaceDetailsData from './ServerDetailsData';
import {TabBar, TabView} from 'react-native-tab-view';
import {Dimensions} from 'react-native';
import {useRaceContext} from '../../store/RaceContext';
import {Subheading, useTheme} from 'react-native-paper';

interface DetailsProps {
  serverName: string;
}

function renderTabBar(
  props: any,
  color: ReactNativePaper.ThemeColors,
): JSX.Element {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: color.text}}
      renderLabel={props => (
        <Subheading {...props}>{props.route.title}</Subheading>
      )}
      style={{backgroundColor: color.background, color: color.text}}
    />
  );
}

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const ServerDetails: React.FC<DetailsProps> = ({serverName}) => {
  const {translations} = useContext(LocalizationContext);
  const [state] = useRaceContext();
  const {colors} = useTheme();
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
      renderTabBar={props => renderTabBar(props, colors)}
      onIndexChange={setIndex}
      renderScene={renderScene}
      navigationState={{index, routes}}
      initialLayout={initialLayout}
    />
  );
};

export default ServerDetails;
