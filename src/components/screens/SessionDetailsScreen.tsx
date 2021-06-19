import React, {useContext} from 'react';
import {View} from 'react-native';
import SessionsTable from '../session/SessionsTable';
import {styles} from '../utils/Theme';
import useSessionResult from '../../hooks/useSessionResult';
import LoadingActivity from '../utils/LoadingActivity';
import {LocalizationContext} from '../translations/LocalizationContext';

interface SessionDetailsProps {
  route: {
    params: {
      hash: string;
      username: string;
      track: {Name: string; Id: number};
    };
  };
}

const SessionDetailsScreen: React.FC<SessionDetailsProps> = ({route}) => {
  const {response, loading} = useSessionResult(route.params.hash);
  const {translations} = useContext(LocalizationContext);

  if (loading) {
    return <LoadingActivity title={translations.loading.driver} />;
  }

  return (
    response && (
      <View style={[styles.column, styles.backgroundColorTarget]}>
        <SessionsTable info={response} layoutId={route.params.track} />
      </View>
    )
  );
};

export default SessionDetailsScreen;
