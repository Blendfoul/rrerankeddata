import React, {useContext} from 'react';
import {Driver} from '../../@types/Driver';
import {NavigationProp} from '@react-navigation/core';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Caption, Paragraph, Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LocalizationContext} from '../translations/LocalizationContext';
import {useRaceStore} from '../../store/RaceContext';
import Flag from 'react-native-flags';

interface FriendCardProps {
  item: Driver;
  navigation: NavigationProp<any>;
}

const FriendCard: React.FC<FriendCardProps> = ({item, navigation}) => {
  const {translations} = useContext(LocalizationContext);
  const raceStore = useRaceStore();

  const driverPress = () => {
    raceStore.setSearchDriver(item.Username);
    navigation.navigate(translations.navigation.driverDetails, item.Username);
  };

  const friendCardStyle = StyleSheet.create({
    container: {
      borderRadius: 4,
      elevation: 3,
      backgroundColor:
        raceStore.DefaultDriver === item.Username ? '#646464' : '#2f2f2f',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowColor: '#f4f4f4',
      margin: 3,
      padding: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    textContainer: {
      alignItems: 'center',
    },
    title: {
      fontSize: 15,
      color: '#fff',
    },
    caption: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      color: '#dbdbdb',
      marginHorizontal: 7.5,
    },
    logoContainer: {
      alignItems: 'center',
      padding: 5,
    },
    containerRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    backgroundAvatar: {
      backgroundColor: '#2f2f2f',
    },
  });

  return (
    <TouchableOpacity style={friendCardStyle.container} onPress={driverPress}>
      <View style={friendCardStyle.logoContainer}>
        <Avatar.Image
          style={friendCardStyle.backgroundAvatar}
          source={{
            uri: 'https://game.raceroom.com/game/user_avatar/' + item.UserId,
          }}
        />
      </View>
      <View>
        <View style={friendCardStyle.textContainer}>
          <Title style={friendCardStyle.title}>
            {item.Fullname}
            <Flag
              code={item.Country.toUpperCase()}
              size={24}
              type={'flat'}
              style={{marginLeft: 10}}
            />
          </Title>
          <Caption style={friendCardStyle.caption}>
            {item.Team || translations.profile.privateer}
          </Caption>
        </View>
        <View style={friendCardStyle.containerRow}>
          <Paragraph style={friendCardStyle.caption}>
            <AntDesign name={'solution1'} size={15} /> {item.Rating}
          </Paragraph>
          <Paragraph style={friendCardStyle.caption}>
            <AntDesign name={'exception1'} size={15} /> {item.Reputation}
          </Paragraph>
        </View>
        <View style={friendCardStyle.containerRow}>
          <Paragraph style={friendCardStyle.caption}>
            <AntDesign name={'car'} size={15} /> {item.RacesCompleted}
          </Paragraph>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FriendCard;
