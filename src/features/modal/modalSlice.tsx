import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '@utils/types';
//TODO: do not associate modal with specific data
interface ModalState {
  showModal: boolean;
  modalProps: {
    name: string;
    rating: number;
    address: string;
    place_id: string;
    reviews?: Review[];
    type?: string;
    photo?: string;
  };
}

const initialState: ModalState = {
  showModal: false,
  modalProps: {
    name: '',
    rating: 0,
    address: '',
    place_id: '',
    reviews: undefined,
    type: '',
    photo: ''
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState['modalProps']>) => {
      state.showModal = true;
      state.modalProps = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalProps = {
        name: '',
        rating: 0,
        address: '',
        place_id: '',
        reviews: undefined,
        type: '',
        photo: ''
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;