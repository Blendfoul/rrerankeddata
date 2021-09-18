import React, {useContext} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverList from './DriverList';
import RaceDetailsData from './ServerDetailsData';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ServerTabsStackList} from '../../types/NavigatorProps';

interface DetailsProps {
  serverName: string;
}

const MaterialTabs = createMaterialTopTabNavigator<ServerTabsStackList>();

const ServerDetails: React.FC<DetailsProps> = ({serverName}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <MaterialTabs.Navigator>
      <MaterialTabs.Screen
        name={'data'}
        options={{
          title: translations.raceDetails.general,
        }}
        component={RaceDetailsData}
        initialParams={{serverName}}
      />
      <MaterialTabs.Screen
        name={'drivers'}
        component={DriverList}
        initialParams={{serverName}}
        options={{title: translations.raceDetails.drivers}}
      />
    </MaterialTabs.Navigator>
  );
};

export default ServerDetails;
