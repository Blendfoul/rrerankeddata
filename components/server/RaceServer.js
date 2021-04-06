import React, {useContext, useEffect, useState} from 'react';
import type {Server} from '../../interfaces/Server';
import ServerDetails from './ServerDetails';
import {LocalizationContext} from '../translations/LocalizationContext';

const RaceServer = props => {
  const [session, setSession] = useState('');
  const sessionData: Server.Server = props.session;
  const {translations} = useContext(LocalizationContext);

  useEffect(() => {
    switch (sessionData.CurrentSession) {
      case 0:
        setSession(translations.session.practice);
        break;
      case 256:
        setSession(translations.session.qualification);
        break;
      case 768:
        setSession(translations.session.race);
        break;
    }
  }, [
    sessionData.CurrentSession,
    translations.session.practice,
    translations.session.qualification,
    translations.session.race,
  ]);

  return (
    <ServerDetails
      data={sessionData}
      navigation={props.navigation}
      loading={props.loading}
      session={session}
    />
  );
};

export default RaceServer;
