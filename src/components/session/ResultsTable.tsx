import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {QualiResult, RaceResult} from '../../types/resultData';
import {TabBar, TabView} from 'react-native-tab-view';
import QualificationRow from './qualification/QualificationRow';
import LoadingActivity from '../utils/LoadingActivity';
import RaceRow from './race/RaceRow';
import useSessionClasses from '../../hooks/useSessionClasses';
import * as _ from 'lodash';
import {useTheme} from 'react-native-paper';

type Route = {key: string; title: string; target: number};

interface TableGeneratorProps {
  data: QualiResult[] | RaceResult[];
  type: 'quali' | 'race';
}

const ResultsTable: React.FC<TableGeneratorProps> = ({data, type}) => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);
  const {values, names, loading} = useSessionClasses(data);
  const {colors} = useTheme();

  const renderTabBar: React.FC<any> = props => {
    const tabStyle = {backgroundColor: 'gray'};

    return (
      <TabBar
        {...props}
        indicatorStyle={tabStyle}
        style={{backgroundColor: colors.background}}
      />
    );
  };

  const routeGenerator = ({route}: {route: Route}) => {
    const sort: QualiResult[] | RaceResult[] =
      type === 'quali'
        ? _.sortBy(values[route.target], o => o.StartPosition) || []
        : _.sortBy(values[route.target], o => o.FinishPositionInClass) || [];
    return (
      <FlatList
        data={sort}
        renderItem={({item}) =>
          type === 'quali' ? (
            <QualificationRow item={item} />
          ) : (
            <RaceRow data={item as RaceResult} />
          )
        }
        keyExtractor={(item, index1) =>
          `Table-${type}-${item.PerformanceIndex}-${index1}`
        }
      />
    );
  };

  useEffect(() => {
    const routes1 = names.map((value, i) => {
      console.log(values.length);
      if (i < values.length) {
        return {key: value, title: value, target: i} as Route;
      }

      return null;
    });

    const filtered: Route[] = routes1.filter(function (el) {
      return el != null;
    }) as Route[];

    setRoutes(filtered);
  }, [names, values.length]);

  const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
  };

  if (loading) {
    return <LoadingActivity title={''} />;
  }

  return (
    <View style={style.tab}>
      <TabView
        scrollEnabled
        renderTabBar={props =>
          renderTabBar(props, {backgroundColor: colors.background})
        }
        navigationState={{index, routes}}
        renderScene={routeGenerator}
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

export default ResultsTable;
