import {configureStore, Middleware} from '@reduxjs/toolkit';
import ServerReducer from './slices/Server';
import GeneralReducer from './slices/General';
import UserReducer from './slices/User';
import thunk from 'redux-thunk';
import DefaultUserReducer from './slices/DefaultUser';
import ResultReducer from './slices/Session';

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

export const store = configureStore({
  reducer: {
    general: GeneralReducer,
    server: ServerReducer,
    user: UserReducer,
    defaultUser: DefaultUserReducer,
    result: ResultReducer,
  },

  middleware: middlewares,
});
