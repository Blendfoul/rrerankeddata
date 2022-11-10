import React from 'react';
import { Card, List, useTheme, Button } from 'react-native-paper';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  DrawerRoutes,
  DrawerStackList,
} from '../../models/navigation/Navigation';

type Props = {};

const NoUserSelected: React.FC<Props> = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigate } = useNavigation<DrawerNavigationProp<DrawerStackList>>();

  const items = [
    t('user.tutorial.step1'),
    t('user.tutorial.step2'),
    t('user.tutorial.step3'),
  ];

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <List.Item
      title={item}
      titleNumberOfLines={2}
      left={props => <List.Icon icon={'circle-small'} {...props} />}
    />
  );

  const navigateToSearch = () => {
    navigate({
      name: DrawerRoutes.SEARCH,
      params: undefined,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card mode={'outlined'} style={styles.root}>
        <Card.Content style={styles.content}>
          <Icon name={'account-plus-outline'} size={30} color={colors.text} />
          <List.Section
            title={t('user.tutorial.header')}
            style={{ width: '100%', flexDirection: 'column', flexShrink: 1 }}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          </List.Section>
        </Card.Content>
      </Card>
      <Button
        style={styles.button}
        color={'red'}
        contentStyle={styles.buttonContent}
        mode={'contained'}
        icon={'account-search'}
        onPress={navigateToSearch}>
        {t('drawer.search')}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  root: {
    margin: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    margin: 10,
  },
  buttonContent: {
    paddingVertical: 5,
    flexDirection: 'row-reverse',
  },
});

export default NoUserSelected;
