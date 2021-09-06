import React, {useCallback, useContext} from 'react';
import LoadingActivity from '../utils/LoadingActivity';
import RaceComponent from './RaceComponent';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import useSortRaces from '../../hooks/useSortRaces';
import {LocalizationContext} from '../translations/LocalizationContext';
import {useTheme} from 'react-native-paper';
import {ReducerActions} from '../../store/StoreReducer';
import {useRaceContext} from '../../store/RaceContext';
import AreaPicker from './AreaPicker';
import useDrawerContent from '../../hooks/useDrawerContent';
import EmptyRaceComponent from './EmptyRaceComponent';

const RaceContainer: React.FC = () => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  const {races} = useSortRaces();
  const {colors} = useTheme();
  const {driver, loading} = useDrawerContent();

  const handleRefresh = useCallback(
    () =>
      dispatch({
        type: ReducerActions.REFRESH_SERVERS,
        payload: !state.refresh,
      }),
    [dispatch, state.refresh],
  );

  if (state.refresh && loading) {
    return <LoadingActivity title={translations.loading.servers} />;
  }

  const style = StyleSheet.create({
    headerBar: {
      display: 'flex',
      flexDirection: 'row',
      flex: 0,
    },
    schedule: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0,
      backgroundColor: colors.background,
    },
    areaPicker: {flex: 3},
  });

  return (
    <FlatList
      data={races}
      ListHeaderComponent={
        <React.Fragment>
          <View style={style.headerBar}>
            <View style={style.areaPicker}>
              <AreaPicker />
            </View>
          </View>
        </React.Fragment>
      }
      stickyHeaderIndices={[0]}
      ListEmptyComponent={<EmptyRaceComponent />}
      renderItem={({item, index}) => (
        <RaceComponent
          data={item.Server}
          driver={driver}
          key={`server-${index}`}
        />
      )}
      keyExtractor={(item, index) => `server-${index}`}
      refreshControl={
        <RefreshControl refreshing={state.refresh} onRefresh={handleRefresh} />
      }
    />
  );
};

export default RaceContainer;
