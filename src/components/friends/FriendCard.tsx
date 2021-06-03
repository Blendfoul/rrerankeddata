import React, {useContext} from 'react';
import {Rating} from '../../types/rating';
import {useNavigation} from '@react-navigation/core';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Caption, Paragraph, Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LocalizationContext} from '../translations/LocalizationContext';
//@ts-ignore
import Flag from 'react-native-flags';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';

interface FriendCardProps {
  item: Rating;
}

const Friend: React.FC<FriendCardProps> = ({item}) => {
  const {translations} = useContext(LocalizationContext);
  const [state, dispatch] = useRaceContext();
  const navigation = useNavigation();

  const driverPress = () => {
    dispatch({
      type: ReducerActions.SET_SEARCH_DRIVER,
      payload: item.Username,
    });
    navigation.navigate({
      name: translations.navigation.driverDetails,
      params: {data: item.Username},
    });
  };

  const friendCardStyle = StyleSheet.create({
    container: {
      borderRadius: 4,
      elevation: 3,
      backgroundColor:
        state.defaultDriver === item.Username ? '#646464' : '#2f2f2f',
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
          <View style={[friendCardStyle.containerRow, {alignItems: 'center'}]}>
            <Title style={friendCardStyle.title}>{item.Fullname}</Title>
            <Flag
              code={item.Country.toUpperCase()}
              size={24}
              type={'flat'}
              style={{marginLeft: 10}}
            />
          </View>
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

const FriendCard = React.memo(Friend);

export default FriendCard;
