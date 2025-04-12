import React from 'react';

import { useRoute } from '@react-navigation/core';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { RefreshControl, ScrollView } from 'react-native';
import { batch, useDispatch, useSelector } from 'react-redux';

import { UserTabStackList } from '../../models/navigation/Navigation';
import LoadingComponent from '../shared/LoadingComponent';
import UserInformation from './details/UserInformation';
import UserPlot from './details/UserPlot';
import UserStatistics from './details/UserStatistics';
import UserTwitchStreamer from './details/UserTwitchStreamer';
import { dataSelector, fetchDefaultRaces, fetchDefaultUser } from '../../store/slices/DefaultUser';
import { fetchRaces, fetchUser, userDataSelector } from '../../store/slices/User';

type Props = MaterialTopTabScreenProps<UserTabStackList, 'Info'>;

const UserDetails: React.FC = () => {
  const { params } = useRoute<Props['route']>();
  const { isLoading, user } = useSelector(params.type === 'User' ? userDataSelector : dataSelector);
  const dispatch = useDispatch();

  const getUserData = () => {
    const userType = params.type === 'User';

    batch(async () => {
      await dispatch(userType ? fetchUser(params.id) : fetchDefaultUser(params.id));
      await dispatch(userType ? fetchRaces(params.id) : fetchDefaultRaces(params.id));
    });
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!user) {
    getUserData();
    return <LoadingComponent />;
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getUserData} />}>
      <UserInformation user={user} />
      <UserStatistics user={user} />
      <UserTwitchStreamer user={user} />
      <UserPlot type={params.type} />
    </ScrollView>
  );
};

export default UserDetails;
