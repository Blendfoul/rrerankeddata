import React from 'react';
import {useRoute} from '@react-navigation/core';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {UserTabStackList} from '../../models/navigation/Navigation';
import LoadingComponent from '../shared/LoadingComponent';
import UserInformation from './details/UserInformation';
import UserStatistics from './details/UserStatistics';
import {useDispatch, useSelector} from 'react-redux';
import {userDataSelector} from '../../store/slices/User';
import {dataSelector} from '../../store/slices/DefaultUser';
import UserTwitchStreamer from './details/UserTwitchStreamer';
import {RefreshControl, ScrollView} from 'react-native';
import UserPlot from './details/UserPlot';
import {fetchServers} from '../../store/slices/Server';

type Props = MaterialTopTabScreenProps<UserTabStackList, 'Info'>;

const UserDetails: React.FC = () => {
  const {params} = useRoute<Props['route']>();
  const {isLoading, user} = useSelector(
    params.type === 'User' ? userDataSelector : dataSelector,
  );
  const dispatch = useDispatch();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => dispatch(fetchServers())}
        />
      }>
      <UserInformation user={user} />
      <UserStatistics user={user} />
      <UserTwitchStreamer user={user} />
      <UserPlot type={params.type} />
    </ScrollView>
  );
};

export default UserDetails;
