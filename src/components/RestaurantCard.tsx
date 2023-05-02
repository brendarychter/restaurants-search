import { Restaurant } from '@utils/types';
import {
  Card,
  Typography,
  CardContent,
  Button,
  CardActions,
  Rating
} from '@mui/material';
import { Star } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';

const RestaurantCard = ({
  name,
  rating,
  address,
  place_id,
  reviews,
  photo,
  type
}: Restaurant): JSX.Element => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    const modalProps = {
      name,
      rating,
      address,
      place_id,
      type,
      reviews
    };
    dispatch(openModal(modalProps));
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} key={place_id}>
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {address}
          </Typography>
          <Rating
            name="text-feedback"
            value={rating}
            readOnly
            precision={0.5}
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpenModal}>
              See more
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default RestaurantCard;
