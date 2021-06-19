import React, {useContext, useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import {styles} from '../utils/Theme';
import {Dimensions} from 'react-native';
import DriverDetails from './DriverDetails';
import DriverHistory from './DriverHistory';
import {LocalizationContext} from '../translations/LocalizationContext';

const renderTabBar: React.FC<any> = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'gray'}}
    style={styles.backgroundColorTarget}
  />
);

interface DriverProps {
  username: string;
}

const DriverComponent: React.FC<DriverProps> = ({username}) => {
  const {translations} = useContext(LocalizationContext);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'data', title: translations.profile.info},
    {key: 'races', title: translations.profile.races},
  ]);

  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'data':
        return <DriverDetails username={username} />;
      case 'races':
        return <DriverHistory username={username} />;
      default:
        return null;
    }
  };

  const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
  };

  return (
    <React.Fragment>
      <TabView
        lazy={true}
        onIndexChange={setIndex}
        renderScene={renderScene}
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        initialLayout={initialLayout}
      />
    </React.Fragment>
  );
};

export default DriverComponent;
