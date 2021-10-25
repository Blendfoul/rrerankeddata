import React, {useMemo} from 'react';
import {Drawer} from 'react-native-paper';
import {FlatList, ListRenderItem, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {DrawerRoutes} from '../../models/navigation/Navigation';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import UserQuickInformation from './UserQuickInformation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {idSelector} from '../../store/slices/DefaultUser';

type MenuItem = {
  label: string;
  route: DrawerRoutes;
  icon: string;
};

const DrawerComponent: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const {navigate} = useNavigation();
  const userId = useSelector(idSelector);

  const routes = useMemo(
    () => [
      {label: 'Server', route: DrawerRoutes.SERVER, icon: 'steering'},
      {label: 'User', route: DrawerRoutes.USER, icon: 'account'},
      {label: 'Search', route: DrawerRoutes.SEARCH, icon: 'account-search'},
      {label: 'About', route: DrawerRoutes.ABOUT, icon: 'information'},
    ],
    [],
  );

  const navigateToStack = (screen: DrawerRoutes) => {
    navigate({
      name: screen,
    });
  };

  const renderItem: ListRenderItem<MenuItem> = ({item}) => {
    if (item.route === DrawerRoutes.USER && userId === -1) {
      return null;
    }

    return (
      <Drawer.Item
        active={navigation.getState().key === item.route}
        label={item.label}
        onPress={navigateToStack.bind(this, item.route)}
        right={props => <Icon name={item.icon} {...props} size={20} />}
      />
    );
  };

  return (
    <SafeAreaView>
      <UserQuickInformation />
      <Drawer.Section>
        <FlatList
          data={routes}
          renderItem={renderItem}
          keyExtractor={item => item.label}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
};

export default DrawerComponent;
