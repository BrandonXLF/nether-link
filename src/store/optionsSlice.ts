import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface OptionsState {
  showAll: boolean
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    showAll: false
  },
  reducers: {
    set: (state, action: PayloadAction<{
      key: keyof OptionsState,
      value: OptionsState[typeof action.payload.key]
    }>) => {
      state[action.payload.key] = action.payload.value;
    }
  }
})

export const { set } = optionsSlice.actions

export default persistReducer({
  key: `nether-link-${optionsSlice.name}`,
  storage,
}, optionsSlice.reducer);