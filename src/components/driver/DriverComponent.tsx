import React, {useContext, useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import {Dimensions} from 'react-native';
import DriverDetails from './DriverDetails';
import DriverHistory from './DriverHistory';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Subheading, useTheme} from 'react-native-paper';

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

interface DriverProps {
  username: string;
}

const DriverComponent: React.FC<DriverProps> = ({username}) => {
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();
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
        lazy
        onIndexChange={setIndex}
        renderScene={renderScene}
        navigationState={{index, routes}}
        renderTabBar={props => renderTabBar(props, colors)}
        initialLayout={initialLayout}
      />
    </React.Fragment>
  );
};

export default DriverComponent;
