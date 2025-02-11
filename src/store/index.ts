import { configureStore } from '@reduxjs/toolkit'
import portalReducer from './portalSlice'
import optionsReducer from './optionsSlice'
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      portals: portalReducer,
      options: optionsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  return { store, persistor: persistStore(store) };
};

export type AppStore = ReturnType<(typeof makeStore)>['store']
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']