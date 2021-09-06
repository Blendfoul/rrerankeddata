import React, {useContext, useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import {Dimensions, StyleSheet, View} from 'react-native';
import ResultsTable from './ResultsTable';
import {LocalizationContext} from '../translations/LocalizationContext';
import {MpRaceResult} from '../../types/resultData';
import SessionDataInfo from './SessionDataInfo';
import {Subheading, useTheme} from 'react-native-paper';

function renderTabBar(
  props: any,
  color: ReactNativePaper.ThemeColors,
): JSX.Element {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: color.text}}
      renderLabel={labelProps => (
        <Subheading {...labelProps}>{labelProps.route.title}</Subheading>
      )}
      style={{backgroundColor: color.background, color: color.text}}
    />
  );
}

interface SessionsTableProps {
  info: MpRaceResult;
  layoutId: {Name: string; Id: number};
}

const SessionsTable: React.FC<SessionsTableProps> = ({info}) => {
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'data', title: translations.session.general},
    {key: 'qualification', title: translations.session.qualification},
    {key: 'race', title: translations.session.race},
  ]);

  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'data':
        return <SessionDataInfo data={info} />;
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
        renderTabBar={props => renderTabBar(props, colors)}
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
},
});

export default SessionsTable;
