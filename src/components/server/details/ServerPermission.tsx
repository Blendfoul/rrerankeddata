import React, { useEffect, useState } from 'react';
import { Banner } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { idSelector } from '../../../store/slices/DefaultUser';
import useRanked from '../../../hooks/useRanked';

type Props = {
  minRating: number;
  minReputation: number;
};

const ServerPermission: React.FC<Props> = ({ minRating, minReputation }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const id = useSelector(idSelector);
  const { rating, loading } = useRanked(id);

  useEffect(() => {
    if (loading) {
      return;
    }

    setVisible(
      (rating?.Rating as number) < minRating ||
        (rating?.Reputation as number) < minReputation,
    );
  }, [minRating, minReputation, loading]);

  return (
    <Banner
      visible={visible}
      actions={[]}
      icon={size => <Icon name={'alert-circle-outline'} {...size} />}>
      {t('server.lowReputation')}
    </Banner>
  );
};

export default ServerPermission;
