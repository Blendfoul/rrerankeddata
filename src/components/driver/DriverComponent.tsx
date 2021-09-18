import React, {useContext} from 'react';
import DriverDetails from './DriverDetails';
import DriverHistory from './DriverHistory';
import {LocalizationContext} from '../translations/LocalizationContext';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DriverMaterialStackList} from '../../types/NavigatorProps';

interface DriverProps {
  username: string;
}

const MaterialTab = createMaterialTopTabNavigator<DriverMaterialStackList>();

const DriverComponent: React.FC<DriverProps> = ({username}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <MaterialTab.Navigator>
      <MaterialTab.Screen
        name={'data'}
        component={DriverDetails}
        initialParams={{username}}
        options={{
          title: translations.profile.info,
        }}
      />
      <MaterialTab.Screen
        name={'races'}
        options={{title: translations.profile.races}}
        component={DriverHistory}
        initialParams={{username}}
      />
    </MaterialTab.Navigator>
  );
};

export default DriverComponent;
