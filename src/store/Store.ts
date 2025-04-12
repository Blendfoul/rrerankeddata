import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { MMKV, Mode } from 'react-native-mmkv';
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { PersistConfig } from 'redux-persist/es/types';
import { thunk } from 'redux-thunk';

import DefaultUserReducer from './slices/DefaultUser';
import GeneralReducer from './slices/General';
import RatingsReducer from './slices/Ratings';
import ServerReducer from './slices/Server';
import ResultReducer from './slices/Session';
import UserReducer from './slices/User';

const middlewares: Middleware[] = [
  /* other middlewares */
  thunk,
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const mmkv = new MMKV({
  id: 'r3e',
  mode: Mode.MULTI_PROCESS,
});

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage: {
    getItem: (key) => mmkv.getString(key) || null,
    setItem: (key, value) => mmkv.set(key, value),
    removeItem: (key) => mmkv.delete(key),
  },
  blacklist: ['result', 'user', 'ratings', 'server'],
  timeout: 0,
};

const rootReducer = combineReducers({
  general: GeneralReducer,
  ratings: RatingsReducer,
  server: ServerReducer,
  user: UserReducer,
  defaultUser: DefaultUserReducer,
  result: ResultReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persists = persistStore(store);
