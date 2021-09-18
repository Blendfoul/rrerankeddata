import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import {SessionMaterialStackList} from '../../types/NavigatorProps';
import React, {useCallback} from 'react';
import {useRoute} from '@react-navigation/core';
import {FlatList, Image, SafeAreaView} from 'react-native';
import * as _ from 'lodash';
import useSessionClasses from '../../hooks/useSessionClasses';
import {CompositeScreenProps} from '@react-navigation/native';
import {QualiResult, RaceResult} from '../../types/resultData';
import QualificationRow from './qualification/QualificationRow';
import RaceRow from './race/RaceRow';
import {ActivityIndicator} from 'react-native-paper';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<SessionMaterialStackList, 'qualification'>,
  MaterialTopTabScreenProps<SessionMaterialStackList, 'race'>
>;

const MaterialTab = createMaterialTopTabNavigator();

const ResultTable: React.FC = () => {
  const {params} = useRoute<Props['route']>();
  const {values, names, ids, loading} = useSessionClasses(params.data);

  const routeGenerator = useCallback(
    (target: number) => {
      let sortResult: QualiResult[] | RaceResult[] = [];

      if (params.type === 'quali') {
        sortResult = _.sortBy(values[target], o => o.StartPosition);
      } else {
        sortResult = _.sortBy(values[target], o => o.FinishPositionInClass);
      }

      return (
        <FlatList
          data={sortResult}
          renderItem={({item}) =>
            params.type === 'quali' ? (
              <QualificationRow item={item} />
            ) : (
              <RaceRow data={item as RaceResult} />
            )
          }
          keyExtractor={(item, index1) =>
            `Table-${params.type}-${item.PerformanceIndex}-${index1}`
          }
        />
      );
    },
    [params.type, values],
  );

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <MaterialTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: names.length === 1 ? 0 : undefined,
        },
      }}>
      {names.map((item, index) => (
        <MaterialTab.Screen
          key={`sessionTab-${index}`}
          name={'item-' + index}
          options={{
            title: '',
            tabBarLabelStyle: {height: 0},
            tabBarIcon: props => (
              <Image
                source={{
                  uri: `https://game.raceroom.com/store/image_redirect?id=${ids[index]}&amp;size=small`,
                }}
                style={{width: 35, height: 35}}
                {...props}
              />
            ),
          }}
          component={routeGenerator.bind(this, index)}
        />
      ))}
    </MaterialTab.Navigator>
  );
};

export default ResultTable;
