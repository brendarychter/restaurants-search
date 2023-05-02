import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { closeModal } from '../features/modal/modalSlice';
import {Rating, List, ListItem, Divider, ListItemText} from '@mui/material';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from '@mui/icons-material';

export default function ModalReviews() {
  const dispatch = useDispatch();
  const {
    showModal,
    modalProps: { name, rating, address, type, reviews }
  } = useSelector((state: RootState) => state.modal);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={showModal}
        onClose={() => handleCloseModal()}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg'
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body'
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {name}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            {type}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <Rating
              name="text-feedback"
              value={rating}
              readOnly
              precision={0.5}
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            ({rating})
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            {address}
          </Typography>

          {/* TODO: mostrar item si hay reviews */}
          <Typography id="modal-desc" textColor="text.tertiary">
            Reviews:
          </Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper'
            }}
          >
            {reviews &&
              reviews?.map((review) => (
                <>
                  {' '}
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={review.author_name}
                      secondary={
                        <>
                          {review.text}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
          </List>
        </Sheet>
      </Modal>
    </>
  );
}
