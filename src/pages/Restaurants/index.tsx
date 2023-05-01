import SearchContainer from '../../components/SearchContainer';
import RestaurantCard from '../../components/RestaurantCard';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { getClosestRestaurantsByLocation } from '../../api/userController';
import {
  getRestaurantsStart,
  getRestaurantsFailure,
  getRestaurantsSuccess
} from '../../features/restaurants/restaurantsSlice';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';

export default function RestaurantFinder() {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location.data);

  const { data } = useSelector(
    (state: RootState) => state.restaurants
  );

  const getRestaurants = async () => {
    dispatch(getRestaurantsStart());
    try {
      dispatch(
        getRestaurantsSuccess(
          await getClosestRestaurantsByLocation({ latitude: 0, longitude: 0 })
        )
      );
    } catch (error) {
      dispatch(getRestaurantsFailure(`Error fetching restaurants: ${error}`));
    }
  };

  useEffect(() => {
    getRestaurants();
    console.log('location: ', location);
  }, [location]);

  return (
    <>
      <SearchContainer></SearchContainer>

      <Typography gutterBottom variant="h5" component="div">
        {/* {location.address} */}
      </Typography>
      {location && location.address}
      {location &&
        data?.map(({ name, rating, address, place_id }) => (
          <>
            <RestaurantCard
              name={name}
              rating={rating}
              address={address}
              place_id={place_id}
            />
          </>
        ))}

      {/* <ModalReviews data={data}></ModalReviews> */}
    </>
  );
}
