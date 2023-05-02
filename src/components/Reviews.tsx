import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { closeModal } from '../features/modal/modalSlice';
import { Rating, List, ListItem, Divider, ListItemText, CardMedia } from '@mui/material';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from '@mui/icons-material';

export default function ModalReviews() {
  const dispatch = useDispatch();
  const {
    showModal,
    modalProps: { name, rating, address, type, reviews, photo }
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: '5vh',
          bottom: '5vh'
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              m: 1,
              zIndex: 1,
              color: 'text.primary'
            }}
            onClick={handleCloseModal}
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
          <CardMedia component="img" height="194" image={photo} alt={name} />
          {type && (
            <Typography id="modal-desc" textColor="text.tertiary">
              {type}
            </Typography>
          )}
          {rating && (
            <Typography id="modal-desc" textColor="text.tertiary">
              <Rating
                name="text-feedback"
                value={rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              ({rating})
            </Typography>
          )}
          <Typography id="modal-desc" textColor="text.tertiary" component="h4">
            {address}
          </Typography>

          {reviews && reviews.length > 0 ? (
            <>
              <Typography
                id="modal-desc"
                textColor="text.tertiary"
                component="span"
              >
                Reviews
              </Typography>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper'
                }}
              >
                {reviews &&
                  reviews?.map((review, index) => (
                    <>
                      {' '}
                      <ListItem alignItems="flex-start" key={index}>
                        <ListItemText
                          primary={review.author_name}
                          secondary={<>{review.text}</>}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  ))}
              </List>
            </>
          ) : (
            <Typography>There are no reviews for this place yet.</Typography>
          )}
        </Sheet>
      </Modal>
    </>
  );
}
