import React from 'react';
import {Drawer} from 'react-native-paper';
import {SafeAreaView} from 'react-native';

const DrawerComponent: React.FC = () => {
  return (
    <SafeAreaView>
      <Drawer.Section>
        <Drawer.Item label={'Server'} />
        <Drawer.Item label={'User'} />
        <Drawer.Item label={'Search'} />
        <Drawer.Item label={'About'} />
      </Drawer.Section>
    </SafeAreaView>
  );
};

export default DrawerComponent;
