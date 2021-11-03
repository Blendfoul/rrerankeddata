import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

const useSession = (sessionId: number) => {
  const [session, setSession] = useState<string>('');
  const {t} = useTranslation();

  useEffect(() => {
    switch (sessionId) {
      case 0:
        setSession(t('raceDetails.session.practice'));
        break;
      case 256:
        setSession(t('raceDetails.session.qualification'));
        break;
      case 768:
        setSession(t('raceDetails.session.race'));
        break;
    }
  }, []);

  return {session};
};

export default useSession;
