import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Caption, Drawer, Paragraph, Title} from 'react-native-paper';
import {LocalizationContext} from '../translations/LocalizationContext';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import {useRaceStore} from '../../store/RaceContext';
import axios from 'axios';
import LoadingActivity from '../utils/LoadingActivity';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const drawerStyle = StyleSheet.create({
  content: {flex: 1, backgroundColor: '#2f2f2f'},
  userInfo: {paddingLeft: 20},
  row: {marginTop: 20, flexDirection: 'row'},
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  },
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
  rowSection: {},
});

const DrawerContent = props => {
  const {translations} = useContext(LocalizationContext);
  const raceStore = useRaceStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserInfo = useCallback(async () => {
    const source = axios.CancelToken.source();

    try {
      setLoading(true);
      const response = await axios(
        `utils/user-info/${raceStore.DefaultDriver}`,
        {
          cancelToken: source.token,
        },
      );

      try {
        const ranked = await axios(
          `multiplayer-rating/user/${response.data.id}.json`,
          {
            cancelToken: source.token,
          },
        );
        setData({
          ...response.data,
          rating: ranked.data.Rating,
          reputation: ranked.data.Reputation,
        });
      } catch (e) {
        setData({
          ...response.data,
          rating: 1500,
          reputation: 70,
        });
      }
    } catch (e) {
      setData({
        avatar:
          'https://game.raceroom.com/assets/user-avatars/helmets/helmet-9.png',
        name: 'Unknow',
        team: '',
        rating: 1500,
        reputation: 70,
      });
    }

    setLoading(false);

    return () => source.cancel();
  }, [raceStore]);

  useEffect(() => getUserInfo(), [getUserInfo, raceStore.DefaultDriver]);

  return (
    <View style={drawerStyle.content}>
      <DrawerContentScrollView {...props}>
        {loading ? (
          <LoadingActivity />
        ) : (
          <View style={drawerStyle.content}>
            <View style={drawerStyle.userInfo}>
              <View style={drawerStyle.row}>
                <Avatar.Image
                  source={{
                    uri: data.avatar,
                  }}
                />
                <View>
                  <Title style={drawerStyle.title}>{data.name}</Title>
                  <Caption style={drawerStyle.caption}>{data.team}</Caption>
                </View>
              </View>
            </View>
            <View style={drawerStyle.rankedRow}>
              <Paragraph style={drawerStyle.textColor}>
                <AntDesign name={'solution1'} color={'#fff'} size={15} />{' '}
                {data.rating}
              </Paragraph>
              <Paragraph style={drawerStyle.textColor}>
                <AntDesign name={'exception1'} color={'#fff'} size={15} />{' '}
                {data.reputation}
              </Paragraph>
            </View>
          </View>
        )}
        <Drawer.Section style={drawerStyle.rowSection}>
          <DrawerItem
            label={translations.navigation.server}
            labelStyle={drawerStyle.textColor}
            icon={({color, size}) => (
              <AntIcon name={'car'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.server)
            }
          />
          <DrawerItem
            label={translations.navigation.user}
            labelStyle={drawerStyle.textColor}
            icon={({color, size}) => (
              <AntIcon name={'user'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.user)
            }
          />
          <DrawerItem
            label={translations.navigation.search}
            labelStyle={drawerStyle.textColor}
            icon={({color, size}) => (
              <AntIcon name={'search1'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.search)
            }
          />
          <DrawerItem
            label={translations.navigation.ranking}
            labelStyle={drawerStyle.textColor}
            icon={({color, size}) => (
              <AntIcon name={'solution1'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.ranking)
            }
          />
          <DrawerItem
            label={translations.navigation.friends}
            labelStyle={drawerStyle.textColor}
            icon={({color, size}) => (
              <AntIcon name={'team'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.friends)
            }
          />
          <DrawerItem
            label={translations.navigation.about}
            labelStyle={drawerStyle.textColor}
            icon={({color, size}) => (
              <MaterialCommunityIcon
                name={'information-outline'}
                color={'#fff'}
                size={size}
              />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.about)
            }
          />
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={drawerStyle.bottomDrawerSection}>
        <DrawerItem
          label={translations.navigation.settings}
          labelStyle={drawerStyle.textColor}
          icon={({color, size}) => (
            <MaterialIcons
              name={'settings'}
              color={'#fff'}
              size={size}
              direction={'ltr'}
            />
          )}
          onPress={() =>
            props.navigation.navigate(translations.navigation.settings)
          }
        />
        <DrawerItem
          label={translations.exitApp}
          labelStyle={drawerStyle.textColor}
          icon={({color, size}) => (
            <MaterialCommunityIcon
              name={'exit-to-app'}
              color={'pink'}
              size={size}
              direction={'ltr'}
            />
          )}
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
