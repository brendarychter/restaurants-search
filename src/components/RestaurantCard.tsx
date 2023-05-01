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

const RestaurantCard = ({
  name,
  rating,
  address,
  place_id
}: Restaurant): JSX.Element => {

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
          <Button size="small">
            See more
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default RestaurantCard;
