import React from 'react';
import {Card, List, useTheme} from 'react-native-paper';
import {FlatList, ListRenderItem, SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

type Props = {};

const NoUserSelected: React.FC<Props> = () => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const items = [
    t('user.tutorial.step1'),
    t('user.tutorial.step2'),
    t('user.tutorial.step3'),
  ];

  const renderItem: ListRenderItem<string> = ({item}) => (
    <List.Item
      title={item}
      titleNumberOfLines={2}
      left={props => <List.Icon icon={'circle-small'} {...props} />}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Card mode={'outlined'} style={styles.root}>
        <Card.Content style={styles.content}>
          <Icon name={'account-plus-outline'} size={30} color={colors.text} />
          <List.Section
            title={t('user.tutorial.header')}
            style={{width: '100%', flexDirection: 'column', flexShrink: 1}}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          </List.Section>
        </Card.Content>
      </Card>
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
});

export default NoUserSelected;
