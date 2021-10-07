import {useEffect, useState} from 'react';

const useSession = (sessionId: number) => {
  const [session, setSession] = useState<string>('');

  useEffect(() => {
    switch (sessionId) {
      case 0:
        setSession('Practice');
        break;
      case 256:
        setSession('Qualification');
        break;
      case 768:
        setSession('Race');
        break;
    }
  }, []);

  return {session};
};

export default useSession;
