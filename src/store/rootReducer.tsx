import { combineReducers } from '@reduxjs/toolkit';
import restaurantsReducer from '../features/restaurants/restaurantsSlice';
import locationReducer from '../features/location/locationSlice';
import modalReducer from '../features/modal/modalSlice';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  location: locationReducer,
  modal: modalReducer,
});

export default rootReducer;