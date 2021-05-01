import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import getLeaderboardData from '../../hooks/leaderboardHooks';
import {Laptime} from '../../types/laptimes';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import LeaderboardRow from './LeaderboardRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../utils/Theme';
import LeaderboardHeader from './LeaderboardHeader';
import {Caption, ProgressBar} from 'react-native-paper';

interface DataProps {
  route: {
    params: {
      classId: number;
      trackId: number;
    };
  };
}

type LeaderboardState = Laptime[] | null;

const LeaderboardDataComponent: React.FC<DataProps> = ({route}) => {
  const [data, setData] = useState(null as LeaderboardState);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const fetchUserData = useCallback(async () => {
    const source = axios.CancelToken.source();

    const value = await AsyncStorage.getItem(
      `${route.params.classId}-${route.params.trackId}`,
    );
    if (value !== null && !refresh) {
      const lapTimes: Laptime[] = JSON.parse(value);

      setData(
        lapTimes
          .filter(lapTime => lapTime.laptime !== -1000)
          .sort((a, b) => a.laptime - b.laptime),
      );
    } else {
      setLoading(true);
      const lapTimes: Laptime[] = await (
        await getLeaderboardData(
          source.token,
          route.params.classId,
          route.params.trackId,
          setProgress,
        )
      )
        .filter(lapTime => lapTime.laptime !== -1000)
        .sort((a, b) => a.laptime - b.laptime);

      await AsyncStorage.setItem(
        `${route.params.classId}-${route.params.trackId}`,
        JSON.stringify(lapTimes),
      );

      setData(lapTimes);
    }

    setLoading(false);

    return () => source.cancel();
  }, [refresh, route.params.classId, route.params.trackId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return loading ? (
    <View style={styles.loadingContainer}>
      <View>
        <ActivityIndicator
          size={'large'}
          color={'white'}
          style={{marginVertical: 15}}
        />
        <ProgressBar
          progress={progress}
          color={'white'}
          style={{
            height: 20,
            width: 150,
            borderRadius: 5,
          }}
        />
        <Caption style={{textAlign: 'center'}}>
          {(progress * 100).toFixed(2)} %
        </Caption>
      </View>
    </View>
  ) : (
    <FlatList
      style={styles.backgroundColor}
      data={data}
      ListHeaderComponent={() => (
        <LeaderboardHeader
          trackId={route.params.trackId}
          classId={route.params.classId}
        />
      )}
      renderItem={({item, index}) => (
        <LeaderboardRow item={item} index={index} />
      )}
      keyExtractor={(item, index) => `Leaderboard-${index}`}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
        />
      }
    />
  );
};

export default LeaderboardDataComponent;
