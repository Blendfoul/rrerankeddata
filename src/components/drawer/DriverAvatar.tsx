import LoadingActivity from '../utils/LoadingActivity';
import {StyleSheet, View} from 'react-native';
import {Avatar, Caption, Paragraph, Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useContext} from 'react';
import useDrawerContent from '../../hooks/useDrawerContent';
import {LocalizationContext} from '../translations/LocalizationContext';

const drawerStyle = StyleSheet.create({
  content: {flex: 1, backgroundColor: '#2f2f2f'},
  userInfo: {paddingLeft: 20},
  row: {marginTop: 20, flexDirection: 'row'},
  textColor: {
    color: '#fff',
  },
  title: {
    color: '#fff',
    marginLeft: 10,
  },
  caption: {
    color: '#f8f8f8',
    marginLeft: 15,
    flexWrap: 'wrap',
  },
  rankedRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const DriverAvatar: React.FC<any> = () => {
  const {translations} = useContext(LocalizationContext);
  const {driver, loading} = useDrawerContent();
  const isJasper = driver?.id === 5716186;
  if (loading) {
    return <LoadingActivity title={translations.loading.start} />;
  }

  return (
    driver && (
      <View style={drawerStyle.content}>
        <View style={drawerStyle.userInfo}>
          <View style={drawerStyle.row}>
            <Avatar.Image
              source={{
                uri: driver.avatar,
              }}
            />
            <View>
              <Title style={drawerStyle.title}>
                {isJasper ? 'Captain Slo' : driver.name}
              </Title>
              <Caption style={drawerStyle.caption}>{driver.team}</Caption>
            </View>
          </View>
        </View>
        <View style={drawerStyle.rankedRow}>
          <Paragraph style={drawerStyle.textColor}>
            <AntDesign name={'solution1'} color={'#fff'} size={15} />{' '}
            {driver.rating}
          </Paragraph>
          <Paragraph style={drawerStyle.textColor}>
            <AntDesign name={'exception1'} color={'#fff'} size={15} />{' '}
            {driver.reputation}
          </Paragraph>
        </View>
      </View>
    )
  );
};

export default DriverAvatar;
