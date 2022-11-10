import React from 'react';
import { useSelector } from 'react-redux';
import { raceSelector } from '../../store/slices/Session';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { RaceResult } from '../../models/data/Result';
import useSessionClasses from '../../hooks/useSessionClasses';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ContentImage from '../shared/ContentImage';
import RaceResultComponent from './race/RaceResultComponent';

const Tab = createMaterialTopTabNavigator();

const RaceComponent: React.FC = () => {
  const data = useSelector(raceSelector);
  const { classes, ids } = useSessionClasses(data);

  const renderTabItem = (item: RaceResult[]) => (
    <FlatList
      data={item}
      renderItem={renderItem}
      keyExtractor={item => `race-${item.UserId}`}
    />
  );

  const renderItem: ListRenderItem<RaceResult> = ({ item }) => (
    <RaceResultComponent data={item} />
  );

  if (!classes.length) {
    return null;
  }

  return (
    <Tab.Navigator>
      {(classes as RaceResult[][]).map((item, index) => (
        <Tab.Screen
          name={`${index}`}
          component={() => renderTabItem(item)}
          options={{
            tabBarIcon: props => (
              <ContentImage
                itemId={ids[index]}
                {...props}
                style={styles.icon}
                resizeMode={'contain'}
              />
            ),
            tabBarStyle: classes.length === 1 ? styles.tab : undefined,
            tabBarLabel: '',
            tabBarLabelStyle: styles.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  tab: {
    height: 0,
  },
  label: {
    height: 0,
  },
});

export default RaceComponent;
