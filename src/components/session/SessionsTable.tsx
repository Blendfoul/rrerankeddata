import React, {useContext} from 'react';
import ResultsTable from './ResultsTable';
import {LocalizationContext} from '../translations/LocalizationContext';
import {MpRaceResult} from '../../types/resultData';
import SessionDataInfo from './SessionDataInfo';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SessionMaterialStackList} from '../../types/NavigatorProps';

interface SessionsTableProps {
  info: MpRaceResult;
  layoutId: {Name: string; Id: number};
}

const MaterialTab = createMaterialTopTabNavigator<SessionMaterialStackList>();

const SessionsTable: React.FC<SessionsTableProps> = ({info}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <MaterialTab.Navigator>
      <MaterialTab.Screen
        name={'data'}
        options={{title: translations.session.general}}
        component={SessionDataInfo}
        initialParams={{
          data: info,
        }}
      />
      <MaterialTab.Screen
        name={'qualification'}
        options={{title: translations.session.qualification}}
        component={ResultsTable}
        initialParams={{
          data: info.QualiResult,
          type: 'quali',
        }}
      />
      <MaterialTab.Screen
        name={'race'}
        options={{title: translations.session.race}}
        component={ResultsTable}
        initialParams={{
          data: info.RaceResult,
          type: 'race',
        }}
      />
    </MaterialTab.Navigator>
  );
};

export default SessionsTable;
