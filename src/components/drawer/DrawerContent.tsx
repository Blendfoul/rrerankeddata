import React, {useContext} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {LocalizationContext} from '../translations/LocalizationContext';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DriverAvatar from './DriverAvatar';
import {useRaceContext} from '../../store/RaceContext';

const drawerStyle = StyleSheet.create({
  textColor: {
    color: '#fff',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  },
  rowSection: {
    paddingTop: 15,
  },
  content: {flex: 1, backgroundColor: '#2f2f2f'},
});

const DrawerContent: React.FC<any> = props => {
  const {translations} = useContext(LocalizationContext);
  const [state] = useRaceContext();

  return (
    <View style={drawerStyle.content}>
      <DrawerContentScrollView {...props}>
        <DriverAvatar />
        <Drawer.Section style={drawerStyle.rowSection}>
          <DrawerItem
            label={translations.navigation.server}
            labelStyle={drawerStyle.textColor}
            icon={({size}) => (
              <Icon name={'car-repair'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.server)
            }
          />
          <DrawerItem
            label={translations.navigation.user}
            labelStyle={drawerStyle.textColor}
            icon={({size}) => (
              <Icon name={'person'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.user)
            }
          />
          {state.defaultDriver !== null ? (
            <DrawerItem
              label={translations.navigation.friends}
              labelStyle={drawerStyle.textColor}
              icon={({size}) => (
                <Icon name={'group'} color={'#fff'} size={size} />
              )}
              onPress={() =>
                props.navigation.navigate(translations.navigation.friends)
              }
            />
          ) : null}
          <DrawerItem
            label={translations.navigation.search}
            labelStyle={drawerStyle.textColor}
            icon={({size}) => (
              <Icon name={'search'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.search)
            }
          />
          <DrawerItem
            label={translations.navigation.ranking}
            labelStyle={drawerStyle.textColor}
            icon={({size}) => (
              <Icon name={'table-rows'} color={'#fff'} size={size} />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.ranking)
            }
          />
          <DrawerItem
            label={translations.navigation.about}
            labelStyle={drawerStyle.textColor}
            icon={({size}) => (
              <MaterialCommunityIcon
                name={'information-outline'}
                color={'#fff'}
                size={size}
                direction={'ltr'}
              />
            )}
            onPress={() =>
              props.navigation.navigate(translations.navigation.about)
            }
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={drawerStyle.bottomDrawerSection}>
        <DrawerItem
          label={translations.exitApp}
          labelStyle={drawerStyle.textColor}
          icon={({size}) => (
            <MaterialCommunityIcon
              name={'exit-to-app'}
              color={'pink'}
              size={size}
              direction={'ltr'}
            />
          )}
          onPress={() => BackHandler.exitApp()}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
