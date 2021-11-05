import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit';
import ServerReducer from './slices/Server';
import RatingsReducer from './slices/Ratings';
import GeneralReducer from './slices/General';
import UserReducer from './slices/User';
import thunk from 'redux-thunk';
import DefaultUserReducer from './slices/DefaultUser';
import ResultReducer from './slices/Session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistConfig} from 'redux-persist/es/types';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

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

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
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
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persists = persistStore(store);
