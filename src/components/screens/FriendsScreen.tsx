import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import LoadingActivity from '../utils/LoadingActivity';
import FriendCard from '../friends/FriendCard';
import {LocalizationContext} from '../translations/LocalizationContext';
import useFriends from '../../hooks/useFriends';

const FriendsScreen: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const {friends, loading} = useFriends();

  if (loading) {
    return <LoadingActivity title={translations.loading.friends} />;
  }

  return (
    friends && (
      <React.Fragment>
        <View style={{flex: 0}} />
        <FlatList
          data={friends}
          renderItem={({item}) => <FriendCard item={item} />}
          keyExtractor={(item, index: number) => `friend-${index}-2`}
        />
      </React.Fragment>
    )
  );
};

export default FriendsScreen;
