import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser, userDataSelector} from '../../store/slices/User';
import {useRoute} from '@react-navigation/core';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {UserTabStackList} from '../../models/navigation/Navigation';
import LoadingComponent from './LoadingComponent';
import UserInformation from './details/UserInformation';
import UserStatistics from './details/UserStatistics';
import UserMostUsed from './details/UserMostUsed';

type Props = MaterialTopTabScreenProps<UserTabStackList, 'Info'>;

const UserDetails: React.FC = () => {
  const {params} = useRoute<Props['route']>();
  const {user, isLoading} = useSelector(userDataSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(params.id));
  }, []);

  if (isLoading || !user) {
    return <LoadingComponent />;
  }

  return (
    <>
      <UserInformation user={user} />
      <UserStatistics user={user} />
      {user.most_used_tracks.length ? <UserMostUsed user={user} /> : null}
    </>
  );
};

export default UserDetails;
