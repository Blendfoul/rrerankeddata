import React from 'react';
import {useLocalObservable} from 'mobx-react-lite';
import {createContext, useContext} from 'react';
import {createRaceStore, RaceStore} from './RaceStore';

const RaceContext = createContext({});

type RaceProps = {
  children: React.ReactNode;
};

export const RaceProvider: React.FC<RaceProps> = ({children}) => {
  const raceStore: RaceStore = useLocalObservable<RaceStore>(createRaceStore);

  return (
    <RaceContext.Provider value={raceStore}>{children}</RaceContext.Provider>
  );
};

export const useRaceStore = (): RaceStore =>
  useContext(RaceContext) as RaceStore;
