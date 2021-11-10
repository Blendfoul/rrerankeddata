import React, {useMemo, useState} from 'react';
import {Drawer} from 'react-native-paper';
import {FlatList, ListRenderItem, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {DrawerRoutes} from '../../models/navigation/Navigation';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import UserQuickInformation from './UserQuickInformation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {idSelector} from '../../store/slices/DefaultUser';
import AppReviewProvider from '../shared/AppReviewProvider';
import {useTranslation} from 'react-i18next';

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
  const [requested, setRequested] = useState<boolean>(false);
  const {t} = useTranslation();

  const routes = useMemo(
    () => [
      {label: t('drawer.server'), route: DrawerRoutes.SERVER, icon: 'steering'},
      {label: t('drawer.user'), route: DrawerRoutes.USER, icon: 'account'},
      {
        label: t('drawer.friends'),
        route: DrawerRoutes.FRIENDS,
        icon: 'account-multiple',
      },
      {
        label: t('drawer.search'),
        route: DrawerRoutes.SEARCH,
        icon: 'account-search',
      },
      {
        label: t('drawer.ranking'),
        route: DrawerRoutes.RANKING,
        icon: 'format-list-bulleted-square',
      },
      {
        label: t('drawer.about'),
        route: DrawerRoutes.ABOUT,
        icon: 'information',
      },
      {
        label: t('drawer.donate'),
        route: DrawerRoutes.DONATE,
        icon: 'hand-heart',
      },
    ],
    [],
  );

  const navigateToStack = (screen: DrawerRoutes) => {
    navigate({
      name: screen,
    });
  };

  const renderItem: ListRenderItem<MenuItem> = ({item}) => {
    if (item.route === DrawerRoutes.FRIENDS && userId === -1) {
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
    <AppReviewProvider requested={requested} setRequested={setRequested}>
      <SafeAreaView>
        <UserQuickInformation />
        <Drawer.Section>
          <FlatList
            data={routes}
            renderItem={renderItem}
            keyExtractor={item => item.label}
          />
          <Drawer.Item
            label={t('drawer.rate')}
            onPress={() => setRequested(true)}
            right={props => <Icon name={'star'} {...props} size={20} />}
          />
        </Drawer.Section>
      </SafeAreaView>
    </AppReviewProvider>
  );
};

export default DrawerComponent;
