'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import Box from './Box';
import {  makeStore } from '@/store';

export default function StoreProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const storeRef = useRef<ReturnType<(typeof makeStore)> | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current.store}>
    <PersistGate loading={<Box>Loading...</Box>} persistor={storeRef.current.persistor}>
      {children}
    </PersistGate>
  </Provider>;
}