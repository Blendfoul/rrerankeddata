import React, {useContext} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {styles} from '../utils/Theme';
import {useRaceContext} from '../../store/RaceContext';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextContainer from '../utils/TextContainer';
import FriendCard from '../friends/FriendCard';
import useServerSof from '../../hooks/useServerSof';
import {ServerInterface} from '../../types/server';
import LoadingActivity from '../utils/LoadingActivity';
import {useTheme} from 'react-native-paper';
import {ReducerActions} from '../../store/StoreReducer';

interface DriverListProps {
  data: string;
}

const DriverList: React.FC<DriverListProps> = ({data}) => {
  const [state, dispatch] = useRaceContext();
  const {colors} = useTheme();

  const handleRefresh = () => {
    dispatch({
      type: ReducerActions.REFRESH_SERVERS,
      payload: true,
    });
  };

  const {Server}: ServerInterface = state.races.find(
    (server: ServerInterface) => server.Server.Settings.ServerName === data,
  );

  const {loading, drivers} = useServerSof(Server.Players);
  const {translations} = useContext(LocalizationContext);

  const componentStyle = StyleSheet.create({
    root: {
      
    },
    image: {
      flex: 1,
      width: 25,
      height: 25,
    },
  });

  if (loading) {
    return <LoadingActivity title={translations.loading.drivers} />;
  }

  if (!drivers.length) {
    return (
      <View style={[styles.loadingContainer]}>
        <TextContainer
          title={<AntIcon name={'car'} size={100} />}
          text={translations.noDrivers}
        />
      </View>
    );
  }

  return (
    <FlatList
      style={componentStyle.root}
      data={drivers}
      numColumns={1}
      renderItem={({item}) => <FriendCard item={item} />}
      keyExtractor={(item, index) => `driver-${index}`}
      refreshControl={
        <RefreshControl refreshing={state.refresh} onRefresh={handleRefresh} />
      }
    />
  );
};

export default DriverList;
