import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DonateScreen from '../screens/DonateScreen';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackList } from '../models/navigation/Navigation';
import { useTranslation } from 'react-i18next';

type Props = {};

const Stack = createNativeStackNavigator();

const DonateStack: React.FC<Props> = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Donate'}
        component={DonateScreen}
        options={{
          title: t('drawer.donate'),
          headerLeft: props => (
            <IconButton
              {...props}
              icon={'menu'}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DonateStack;
