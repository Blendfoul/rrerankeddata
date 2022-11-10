import React, { useEffect } from 'react';
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import { Platform } from 'react-native';

const UpdateContainer: React.FC = ({ children }) => {
  const inAppUpdates = new SpInAppUpdates(false);

  useEffect(() => {
    inAppUpdates.checkNeedsUpdate().then(result => {
      if (result.shouldUpdate) {
        let updateOptions: StartUpdateOptions = {};
        if (Platform.OS === 'android') {
          // android only, on iOS the user will be prompted to go to your app store page
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }
        inAppUpdates.startUpdate(updateOptions);
      }
    });
  }, []);

  return <>{children}</>;
};

export default UpdateContainer;
