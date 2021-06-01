import {useContext, useEffect, useState} from 'react';
import {LocalizationContext} from '../components/translations/LocalizationContext';

const useRaceSession = (sessionId: number) => {
  const [session, setSession] = useState<string>('');
  const {translations} = useContext(LocalizationContext);

  useEffect(() => {
    switch (sessionId) {
      case 0:
        setSession(translations.sessions.practice);
        break;
      case 256:
        setSession(translations.sessions.qualification);
        break;
      case 768:
        setSession(translations.sessions.race);
        break;
    }
  }, [
    sessionId,
    translations.sessions.practice,
    translations.sessions.qualification,
    translations.sessions.race,
  ]);

  return {session};
};

export default useRaceSession;
