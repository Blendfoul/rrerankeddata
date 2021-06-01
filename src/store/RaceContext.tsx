import React, {useReducer} from 'react';
import {createContext, useContext} from 'react';
import {createRaceStore} from './RaceStore';
import {Action, RaceStore} from '../types/raceStore';
import {storeReducer} from './StoreReducer';

type RaceContextType = [state: RaceStore, dispatch: React.Dispatch<Action>];

const RaceContext = createContext<RaceContextType | null>(null);

type RaceProps = {
  children: React.ReactNode;
};

export const RaceProvider: React.FC<RaceProps> = ({children}) => {
  const [state, dispatch] = useReducer(storeReducer, createRaceStore());

  return (
    <RaceContext.Provider value={[state, dispatch]}>
      {children}
    </RaceContext.Provider>
  );
};

export const useRaceContext: () => RaceContextType = () => {
  const raceContext = useContext(RaceContext);

  if (!raceContext) {
    throw new Error('');
  }

  return raceContext;
};
