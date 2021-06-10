import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {styles} from '../utils/Theme';
import DriverData from './DriverData';
import DriverImage from './DriverImage';
import LoadingActivity from '../utils/LoadingActivity';
import useDriver from '../../hooks/useDriver';
import {LocalizationContext} from '../translations/LocalizationContext';

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
      <ScrollView style={[styles.backgroundColorTarget]}>
        <DriverImage data={driver.data} />
        <DriverData data={driver} />
      </ScrollView>
    )
  );
};

export default DriverDetails;
