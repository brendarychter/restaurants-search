import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '@utils/types';

interface RestaurantsState {
  data: Restaurant[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  data: [],
  loading: false,
  error: null
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    getRestaurantsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRestaurantsSuccess(state, action: PayloadAction<Restaurant[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    getRestaurantsFailure(state, action: PayloadAction<string>) {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getRestaurantsStart,
  getRestaurantsSuccess,
  getRestaurantsFailure
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;