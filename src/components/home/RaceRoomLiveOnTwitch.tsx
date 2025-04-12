import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { Banner } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useStreamData from '../../hooks/useStreamData';

const RaceRoomLiveOnTwitch: React.FC = () => {
  const { data } = useStreamData('raceroomracingexperience');
  const [visible, setVisible] = useState<boolean>(data?.is_live || false);
  const { t } = useTranslation();

  useEffect(() => {
    setVisible(data?.is_live || false);
  }, [data?.is_live]);

  const linkToStreamer = () => {
    Linking.openURL(`https://twitch.tv/${data?.broadcaster_login}`);
  };

  return (
    <Banner
      visible={visible}
      style={{ backgroundColor: '#AA70FF' }}
      actions={[
        {
          label: t('banner.confirm'),
          onPress: linkToStreamer,
        },
        {
          label: t('banner.close'),
          onPress: () => setVisible(false),
        },
      ]}
      icon={(size) => <Icon name={'twitch'} {...size} />}>
      {`${t('banner.raceRoomLive')}\n${data?.title}`}
    </Banner>
  );
};

export default RaceRoomLiveOnTwitch;
