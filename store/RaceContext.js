import React from 'react';
import {useLocalObservable} from 'mobx-react-lite';
import {createContext, FunctionComponent, useContext} from 'react';
import {createRaceStore, RaceStore} from './RaceStore';

const RaceContext = createContext(null);

type RaceProps = {};

export const RaceProvider: FunctionComponent<RaceProps> = ({children}) => {
  const raceStore: RaceStore = useLocalObservable(createRaceStore);

  return (
    <RaceContext.Provider value={raceStore}>{children}</RaceContext.Provider>
  );
};

export const useRaceStore = (): RaceStore => useContext(RaceContext);
