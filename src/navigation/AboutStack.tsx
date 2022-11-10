import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../screens/AboutScreen';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackList } from '../models/navigation/Navigation';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

type Props = {};

const AboutStack: React.FC<Props> = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'About'}
        component={AboutScreen}
        options={{
          title: t('drawer.about'),
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

export default AboutStack;
