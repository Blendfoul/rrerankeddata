import { useNavigation } from "@react-navigation/core";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerStackList, ServerRoutes, ServerStackList } from "../models/navigation/Navigation";
import { NativeStackHeaderLeftProps, NativeStackHeaderRightProps } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import { PropsWithChildren, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRatings } from "../store/slices/Ratings";
import { idSelector, defaultUserActions } from "../store/slices/DefaultUser";
import { userIdSelector, userLoadingSelector } from "../store/slices/User";

export const MenuHeader = (props: NativeStackHeaderLeftProps) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();

  const onPress = () => navigation.openDrawer();

  return <IconButton {...props} icon="menu" onPress={onPress} />;
}

export const DrawerWrapperComponent = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchRatings());
  }, []);

  return (
    <>{children}</>
  );
};

export const HeaderRight = (props: NativeStackHeaderRightProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(userLoadingSelector);
  const searchId = useSelector(userIdSelector);
  const id = useSelector(idSelector);

  return (
    <IconButton
      {...props}
      disabled={isLoading}
      icon={id === searchId ? 'account-check-outline' : 'account-plus-outline'}
      onPress={() => {
        dispatch(defaultUserActions.setUserId(searchId));
      }}
    />
  );
};

export const ScheduleHeader = (props: NativeStackHeaderRightProps) => {
  const navigation = useNavigation<DrawerNavigationProp<ServerStackList>>();

  return (
    <IconButton
      icon={'calendar-outline'}
      {...props}
      onPress={() =>
        navigation.navigate({
          name: ServerRoutes.SCHEDULE,
          params: undefined,
        })
      }
    />
  );
};

export const RemoveDefinedUser = (props: NativeStackHeaderRightProps) => {
  const dispatch = useDispatch();
  const id = useSelector(idSelector);

  const removeDefaultUser = () => {
    dispatch(defaultUserActions.setUserId(-1));
  };

  if (id === -1) {
    return null;
  }

  return (
    <IconButton
      {...props}
      icon={'account-remove-outline'}
      onPress={removeDefaultUser}
    />
  );
};
