import React, {useContext, useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import {Dimensions, StyleSheet, View} from 'react-native';
import type {Race} from '../../interfaces/RaceData';
import SessionDataInfo from './SessionDataInfo';
import QualificationTable from './QualificationTable';
import RaceTable from './RaceTable';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';

const renderTabBar = props => {
  const tabStyle = {backgroundColor: 'gray'};

  return (
    <TabBar
      {...props}
      indicatorStyle={styles.backgroundColor}
      style={tabStyle}
    />
  );
};

const SessionsTable = ({
  info,
  layoutId,
}: {
  info: Race,
  layoutId: Number,
}): React.Component => {
  const {translations} = useContext(LocalizationContext);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'data', title: translations.session.general},
    {key: 'qualification', title: translations.session.qualification},
    {key: 'race', title: translations.session.race},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'data':
        return <SessionDataInfo info={info.RaceInfos} layoutId={layoutId} />;
      case 'qualification':
        return <QualificationTable data={info.Quali} />;
      case 'race':
        return <RaceTable data={info.Race} />;
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
    backgroundColor: 'gray',
  },
});

export default SessionsTable;
