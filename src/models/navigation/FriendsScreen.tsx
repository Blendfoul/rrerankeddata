import React from 'react';

import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import DriverCard from '../../components/shared/DriverCard';
import LoadingComponent from '../../components/shared/LoadingComponent';
import useFriends from '../../hooks/useFriends';
import { idSelector } from '../../store/slices/DefaultUser';

const FriendsScreen: React.FC = () => {
  const id = useSelector(idSelector);
  const { friends, loading } = useFriends(id);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => <DriverCard driver={item} />}
      keyExtractor={(item, index: number) => `friend-${index}-2`}
    />
  );
};

export default FriendsScreen;
