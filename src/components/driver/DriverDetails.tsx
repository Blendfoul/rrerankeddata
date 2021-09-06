import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import DriverData from './DriverData';
import LoadingActivity from '../utils/LoadingActivity';
import useDriver from '../../hooks/useDriver';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverHeader from './DriverHeader';
import DriverMostUsed from './DriverMostUsed';
import DriverPlots from './DriverPlots';

interface DriverDetailsProps {
  username: string;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({username}) => {
  const {driver, loading} = useDriver(username);
  const {translations} = useContext(LocalizationContext);

  if (loading) {
    return <LoadingActivity title={translations.loading.driver} />;
  }

  return (
    driver && (
      <ScrollView>
        <DriverHeader item={driver} />
        <DriverData data={driver} />
        <DriverPlots data={driver.data.user_id} />
        <DriverMostUsed item={driver} />
      </ScrollView>
    )
  );
};

export default DriverDetails;
