import React, {useEffect, useState} from 'react';
import type {Server} from '../../interfaces/Server';
import ServerDetails from './ServerDetails';
import {sessions} from '../../assets/strings/en.json';

const RaceServer = props => {
  const [session, setSession] = useState('');
  const sessionData: Server.Server = props.session;

  useEffect(() => {
    switch (sessionData.CurrentSession) {
      case 0:
        setSession(sessions.practice);
        break;
      case 256:
        setSession(sessions.qualification);
        break;
      case 768:
        setSession(sessions.race);
        break;
    }
  }, [sessionData.CurrentSession]);

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
