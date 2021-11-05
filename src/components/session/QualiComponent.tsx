import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {QualiResult} from '../../models/data/Result';
import {qualiSelector} from '../../store/slices/Session';
import QualiResultComponent from './quali/QualiResultComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import useSessionClasses from '../../hooks/useSessionClasses';
import ContentImage from '../shared/ContentImage';

const Tab = createMaterialTopTabNavigator();

const QualiComponent: React.FC = () => {
  const data = useSelector(qualiSelector);
  const {classes, ids} = useSessionClasses(data);

  const renderTabItem = (item: QualiResult[]) => (
    <FlatList
      data={item}
      renderItem={renderItem}
      keyExtractor={item => `quali-${item.UserId}`}
    />
  );

  const renderItem: ListRenderItem<QualiResult> = ({item}) => (
    <QualiResultComponent data={item} />
  );

  if (!classes.length) {
    return null;
  }

  return (
    <Tab.Navigator>
      {(classes as QualiResult[][]).map((item, index) => (
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

export default QualiComponent;
