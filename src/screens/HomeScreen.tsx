import React, {useEffect} from 'react';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import Server from '../components/server/Server';
import {useRaceSelector} from '../store/hooks';
import {fetchServers, selectRegionSelector} from '../store/slices/Server';
import {useDispatch} from 'react-redux';
import PickersComponent from '../components/home/PickersComponent';
import {RankedServer} from '../models/data/Ranked';

const HomeScreen: React.FC = () => {
  const {server, isLoading} = useRaceSelector(selectRegionSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServers());
  }, []);

  const renderItem: ListRenderItem<RankedServer> = ({item}) => (
    <Server data={item} />
  );

  return (
    <>
      <FlatList
        data={server}
        ListHeaderComponent={<PickersComponent />}
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.Server.ServerIp}-${index}`}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(fetchServers())}
          />
        }
      />
    </>
  );
};

export default HomeScreen;
