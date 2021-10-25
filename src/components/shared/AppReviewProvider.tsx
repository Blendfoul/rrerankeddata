import React, {useEffect, useState} from 'react';
import InAppReview from 'react-native-in-app-review';

const AppReviewProvider: React.FC = ({children}) => {
  const [isAvailable, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    setAvailable(InAppReview.isAvailable());
  }, []);

  const requestReview = async () => {
    try {
      const flow = await InAppReview.RequestInAppReview();

      if (flow) {
        console.log(flow);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAvailable) {
      console.warn(isAvailable);
      requestReview();
    }
  }, []);

  return <>{children}</>;
};

export default AppReviewProvider;
