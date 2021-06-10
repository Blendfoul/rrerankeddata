import React, {useContext, useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import {Dimensions, StyleSheet, View} from 'react-native';
import ResultsTable from './ResultsTable';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';
import {MpRaceResult} from '../../types/resultData';
import SessionDataInfo from './SessionDataInfo';

const renderTabBar: React.FC<any> = props => {
  const tabStyle = {backgroundColor: 'gray'};

  return (
    <TabBar
      {...props}
      indicatorStyle={tabStyle}
      style={styles.backgroundColorTarget}
    />
  );
};

interface SessionsTableProps {
  info: MpRaceResult;
  layoutId: {Name: string; Id: number};
}

const SessionsTable: React.FC<SessionsTableProps> = ({info}) => {
  const {translations} = useContext(LocalizationContext);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'data', title: translations.session.general},
    {key: 'qualification', title: translations.session.qualification},
    {key: 'race', title: translations.session.race},
  ]);

  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'data':
        return (
          <SessionDataInfo
            info={info.RaceInfos}
            layoutId={info.TrackLayoutId}
          />
        );
      case 'qualification':
        return <ResultsTable data={info.QualiResult} type={'quali'} />;
      case 'race':
        return <ResultsTable data={info.RaceResult} type={'race'} />;
      default:
        return null;
    }
  };

  const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
  };

  return (
    <View style={style.tab}>
      <TabView
        lazy
        lazyPreloadDistance={1}
        scrollEnabled
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};

const style = StyleSheet.create({
  tab: {
    flex: 2,
    backgroundColor: '#2f2f2f',
  },
});

export default SessionsTable;
