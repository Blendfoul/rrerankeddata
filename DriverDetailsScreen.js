import React from 'react';

import DriverComponent from './DriverComponent';

const DriverDetailsScreen = ({route, navigation}) => {
  return <DriverComponent data={route.params} navigation={navigation} />;
};

export default DriverDetailsScreen;
