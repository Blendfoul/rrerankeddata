import React, {useContext} from 'react';
import {Rating} from '../../types/rating';
import {useNavigation} from '@react-navigation/core';
import {StyleSheet} from 'react-native';
import {Avatar, Card, Paragraph} from 'react-native-paper';
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
    root: {
      backgroundColor:
        state.defaultDriver === item.Username ? '#646464' : '#2f2f2f',
      margin: 5,
    },
    caption: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      color: '#dbdbdb',
      marginHorizontal: 7.5,
    },
    containerRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

  return (
    <Card onPress={driverPress} elevation={3} style={friendCardStyle.root}>
      <Card.Title
        title={item.Fullname}
        subtitle={item.Team || translations.profile.privateer}
        left={props => (
          <Avatar.Image
            {...props}
            source={{
              uri: 'https://game.raceroom.com/game/user_avatar/' + item.UserId,
            }}
          />
        )}
        right={() => (
          <Flag
            code={item.Country.toUpperCase()}
            size={24}
            type={'flat'}
            style={{marginHorizontal: 10}}
          />
        )}
      />
      <Card.Content style={friendCardStyle.containerRow}>
        <Paragraph style={friendCardStyle.caption}>
          <AntDesign name={'solution1'} size={15} /> {item.Rating}
        </Paragraph>
        <Paragraph style={friendCardStyle.caption}>
          <AntDesign name={'exception1'} size={15} /> {item.Reputation}
        </Paragraph>
        <Paragraph style={friendCardStyle.caption}>
          <AntDesign name={'car'} size={15} /> {item.RacesCompleted}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const FriendCard = React.memo(Friend);

export default FriendCard;
