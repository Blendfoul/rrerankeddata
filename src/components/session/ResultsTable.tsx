import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from '../utils/Theme';
import {QualiResult, RaceResult} from '../../types/resultData';
import {TabBar, TabView} from 'react-native-tab-view';
import QualificationRow from './qualification/QualificationRow';
import LoadingActivity from '../utils/LoadingActivity';
import RaceRow from './race/RaceRow';

type Route = {key: string; title: string; target: number};

interface TableGeneratorProps {
  data: QualiResult[] | RaceResult[];
  type: 'quali' | 'race';
}

const ResultsTable: React.FC<TableGeneratorProps> = ({data, type}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [values, setData] = useState<QualiResult[][] | RaceResult[][]>([]);

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

  const routeGenerator = ({route}: {route: Route}) => {
    const sort: QualiResult[] | RaceResult[] =
      type === 'quali'
        ? values[route.target]?.sort(
            //@ts-ignore
            (a, b) => a.StartPosition > b.StartPosition,
          ) || []
        : values[route.target]?.sort(
            //@ts-ignore
            (a, b) => a.FinishPositionInClass > b.FinishPositionInClass,
          ) || [];
    return (
      <FlatList
        style={styles.backgroundColorTarget}
        data={sort}
        renderItem={({item}) =>
          type === 'quali' ? (
            <QualificationRow item={item} />
          ) : (
            <RaceRow data={item as RaceResult} />
          )
        }
        keyExtractor={(item, index) =>
          `Table-${type}-${item.PerformanceIndex}-${index}`
        }
      />
    );
  };

  const filterClasses = useCallback(() => {
    const classIndex = data
      .map(driver => driver.PerformanceIndex)
      .filter((value, index, array) => array.indexOf(value) === index);

    const classNames = data
      .map(driver => driver.CarClass.Name)
      .filter((value, index, array) => array.indexOf(value) === index);

    while (classNames.length > classIndex.length) {
      classNames.pop();
    }

    setRoutes(
      classNames.map((value, index) => {
        return {key: value, title: value, target: index};
      }),
    );

    setData(
      classIndex.map(id =>
        data.filter(driver => driver.PerformanceIndex === id),
      ),
    );
    setLoading(false);
  }, [data]);

  useEffect(() => {
    filterClasses();
  }, [filterClasses]);

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
        renderTabBar={renderTabBar}
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
    backgroundColor: '#2f2f2f',
  },
});

export default ResultsTable;
