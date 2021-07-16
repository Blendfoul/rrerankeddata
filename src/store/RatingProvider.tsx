import React from 'react';
import useRatingContext from '../hooks/useRatingContext';

const RatingProvider: React.FC = ({children}) => {
  useRatingContext();

  return <React.Fragment>{children}</React.Fragment>;
};

export default RatingProvider;
