import React from 'react';
import {useSelector} from 'react-redux';
import {idSelector} from '../../store/slices/DefaultUser';
import LoadingComponent from '../../components/shared/LoadingComponent';
import {FlatList} from 'react-native';
import DriverCard from '../../components/shared/DriverCard';
import useFriends from '../../hooks/useFriends';

const FriendsScreen: React.FC = () => {
  const id = useSelector(idSelector);
  const {friends, loading} = useFriends(id);

  if (loading) {
    return <LoadingComponent />;
  }

  console.log(friends);

  return (
    <FlatList
      data={friends}
      renderItem={({item}) => <DriverCard driver={item} />}
      keyExtractor={(item, index: number) => `friend-${index}-2`}
    />
  );
};

export default FriendsScreen;
