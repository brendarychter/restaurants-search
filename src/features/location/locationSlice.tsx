import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '@utils/types';

export interface LocationState {
  data: Location | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  data: null,
  loading: false,
  error: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    getLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    getLocationSuccess(state, action: PayloadAction<Location>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    getLocationFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { getLocationStart, getLocationSuccess, getLocationFailure } =
  locationSlice.actions;

export default locationSlice.reducer;
