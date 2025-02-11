import Portal from '@/types/Portal'
import { nextPortalId } from '@/utils/portalUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createTransform, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loadArray, toSaveable } from '@/utils/portalStoreUtils';

export interface PortalStoreState {
  overworld: Record<string, Portal>,
  nether: Record<string, Portal>,
}

export const portalSlice = createSlice({
  name: 'portals',
  initialState: {
    overworld: {},
    nether: {}
  } as PortalStoreState,
  reducers: {
    load: (state, action: PayloadAction<{
      store: PortalStoreState
    }>) => {
      state.overworld = action.payload.store.overworld;
      state.nether = action.payload.store.nether;
    },
    add: (state, action: PayloadAction<{
      type: keyof PortalStoreState,
      id: string,
      portal: Portal
    }>) => {
      state[action.payload.type][nextPortalId()] = action.payload.portal;
    },
    remove: (state, action: PayloadAction<{
      type: keyof PortalStoreState,
      id: string
    }>) => {
      delete state[action.payload.type][action.payload.id];
    },
    update: (state, action: PayloadAction<{
      type: keyof PortalStoreState,
      id: string,
      prop: keyof Portal,
      value: Portal[typeof action.payload.prop]
    }>) => {
      state[action.payload.type][action.payload.id][action.payload.prop] = action.payload.value;
    }
  }
})

export const { load, add, remove, update } = portalSlice.actions

export default persistReducer({
  keyPrefix: 'nether-link-',
  key: portalSlice.name,
  storage,
  transforms: [
    createTransform(
      (subState, key) => {
        switch (key) {
          case 'overworld':
          case 'nether':
            return toSaveable(subState);
          default:
            return subState;
        }
      },
      (subState, key) => {
        switch (key) {
          case 'overworld':
            return loadArray(subState, false);
          case 'nether':
            return loadArray(subState, true);
          default:
            return subState;
        }
      },
      {
        whitelist: ['overworld', 'nether']
      }
    )
  ]
}, portalSlice.reducer);