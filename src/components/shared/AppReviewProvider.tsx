import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import InAppReview from 'react-native-in-app-review';

type Props = {
  requested: boolean;
  setRequested: Dispatch<SetStateAction<boolean>>;
};

const AppReviewProvider: React.FC<Props> = ({
  children,
  requested,
  setRequested,
}) => {
  const [isAvailable, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    setAvailable(InAppReview.isAvailable());
  }, []);

  const requestReview = async () => {
    try {
      const flow = await InAppReview.RequestInAppReview();

      if (flow) {
        console.log(flow);
        setRequested(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAvailable && requested) {
      console.warn(isAvailable);
      requestReview();
    }
  }, [requested]);

  return <>{children}</>;
};

export default AppReviewProvider;
