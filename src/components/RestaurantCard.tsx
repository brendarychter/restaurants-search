import { Restaurant } from "src/utils/types";
import { Card, Typography, CardContent, Button, CardActions } from '@mui/material';

const RestaurantCard: React.FC<Restaurant> = ({
  restaurant: { name, rating }
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {rating}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See more</Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
