import React, {useEffect} from 'react';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import Server from '../components/server/Server';
import {fetchServers, selectRegionSelector} from '../store/slices/Server';
import {useDispatch, useSelector} from 'react-redux';
import PickersComponent from '../components/home/PickersComponent';
import {RankedServer} from '../models/data/Ranked';
import RaceRoomLiveOnTwitch from '../components/home/RaceRoomLiveOnTwitch';

const HomeScreen: React.FC = () => {
  const {server, isLoading} = useSelector(selectRegionSelector);
  const dispatch = useDispatch();

  const getServers = async () => await dispatch(fetchServers());

  useEffect(() => {
    getServers();
  }, []);

  const renderItem: ListRenderItem<RankedServer> = ({item}) => (
    <Server data={item} />
  );

  const getItemLayout = (
    data: RankedServer[] | null | undefined,
    index: number,
  ) => ({
    length: 70,
    offset: 70 * index,
    index,
  });

  return (
    <FlatList
      data={server}
      ListHeaderComponent={
        <>
          <PickersComponent />
          <RaceRoomLiveOnTwitch />
        </>
      }
      stickyHeaderIndices={[0]}
      renderItem={renderItem}
      keyExtractor={item => item.Server.Settings.ServerName}
      refreshing={isLoading}
      getItemLayout={getItemLayout}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getServers} />
      }
    />
  );
};

export default HomeScreen;
