import { useSyncExternalStore } from "react";
import { Listener } from "../../models";
import { GeneralState } from "../../models/state";
import { update } from "lodash";
import { R3eData } from "../../models/data/General";

let initialState: GeneralState = {
  r3eData: {
    cars: {},
    classes: {},
    layouts: {},
    liveries: {},
    manufacturers: {},
    teams: {},
    tracks: {},
  },
  region: '',
  session: -1,
  order: false,
  isLoading: false,
};

const listeners = new Set<Listener>();

const getState = () => initialState;

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

const generalStateActions = {
  updateR3eData: (data: R3eData) => {
    initialState = {
      ...initialState,
      r3eData: data,
    };

    emitChange();
  },
  updateRegion: (region: string) => {
    initialState = { 
      ...initialState,
      region,
    };

    emitChange();
  },
  updateSession: (session: number) => {
    initialState = { 
      ...initialState,
      session,
    };

    emitChange();
  },
  updateOrder: (order: boolean) => {
    initialState = { 
      ...initialState,
      order,
    };

    emitChange();
  },
};

function useGeneralStore() {
  return useSyncExternalStore(subscribe, getState, getState);
}

export { useGeneralStore, generalStateActions };
