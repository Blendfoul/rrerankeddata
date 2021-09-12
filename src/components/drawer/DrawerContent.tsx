import React, {useContext} from 'react';
import {BackHandler, Platform, StyleSheet, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {LocalizationContext} from '../translations/LocalizationContext';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DriverAvatar from './DriverAvatar';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';

const drawerStyle = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  },
  rowSection: {
    paddingTop: 15,
  },
  content: {flex: 1},
});

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const {translations} = useContext(LocalizationContext);
  const [state, dispatch] = useRaceContext();

  const setCurrentTheme = () => {
    dispatch({
      type: ReducerActions.SET_THEME,
      payload: state.theme === 'dark' ? 'light' : 'dark',
    });
  };

  return (
    <View style={drawerStyle.content}>
      <DrawerContentScrollView {...props}>
        <DriverAvatar />
        <Drawer.Section style={drawerStyle.rowSection}>
          <DrawerItem
            label={translations.navigation.server}
            icon={iconProps => (
              <Icon name={'car-traction-control'} {...iconProps} />
            )}
            onPress={() =>
              props.navigation.navigate(
                `${translations.navigation.server}-drawer`,
              )
            }
          />
          <DrawerItem
            label={translations.navigation.user}
            icon={iconProps => <Icon name={'account'} {...iconProps} />}
            onPress={() =>
              props.navigation.navigate(
                `${translations.navigation.user}-drawer`,
              )
            }
          />
          {state.defaultDriver !== '' ? (
            <DrawerItem
              label={translations.navigation.friends}
              icon={iconProps => <Icon name={'account-group'} {...iconProps} />}
              onPress={() =>
                props.navigation.navigate(
                  `${translations.navigation.friends}-drawer`,
                )
              }
            />
          ) : null}
          <DrawerItem
            label={translations.navigation.search}
            icon={iconProps => <Icon name={'account-search'} {...iconProps} />}
            onPress={() =>
              props.navigation.navigate(
                `${translations.navigation.search}-drawer`,
              )
            }
          />
          <DrawerItem
            label={translations.navigation.ranking}
            icon={iconProps => <Icon name={'text'} {...iconProps} />}
            onPress={() =>
              props.navigation.navigate(
                `${translations.navigation.ranking}-drawer`,
              )
            }
          />
          <DrawerItem
            label={translations.navigation.about}
            icon={iconProps => (
              <MaterialCommunityIcon
                name={'information-outline'}
                {...iconProps}
                direction={'ltr'}
              />
            )}
            onPress={() =>
              props.navigation.navigate(
                `${translations.navigation.about}-drawer`,
              )
            }
          />
          {Platform.OS === 'android' ? (
            <DrawerItem
              label={translations.navigation.donate}
              icon={iconProps => (
                <MaterialCommunityIcon
                  name={'hand-heart'}
                  {...iconProps}
                  direction={'ltr'}
                />
              )}
              onPress={() =>
                props.navigation.navigate(
                  `${translations.navigation.donate}-drawer`,
                )
              }
            />
          ) : null}
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={drawerStyle.bottomDrawerSection}>
        <DrawerItem
          icon={props => (
            <MaterialCommunityIcon
              name={'invert-colors'}
              {...props}
              direction={'ltr'}
            />
          )}
          label={state.theme.charAt(0).toUpperCase() + state.theme.slice(1)}
          onPress={setCurrentTheme}
        />
        {Platform.OS === 'android' ? (
          <DrawerItem
            label={translations.exitApp}
            icon={({size}) => (
              <MaterialCommunityIcon
                name={'exit-to-app'}
                color={'red'}
                size={size}
                direction={'ltr'}
              />
            )}
            onPress={() => BackHandler.exitApp()}
          />
        ) : null}
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

/*
 <DrawerItem
            label={translations.navigation.settings}
            icon={iconProps => (
              <MaterialCommunityIcon
                name={'cog'}
                {...iconProps}
                direction={'ltr'}
              />
            )}
            onPress={() =>
              props.navigation.navigate(
                `${translations.navigation.settings}-drawer`,
              )
            }
          />
 */
