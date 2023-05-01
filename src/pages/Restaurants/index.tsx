import SearchContainer from '../../components/SearchContainer';
import RestaurantCard from '../../components/RestaurantCard';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClosestRestaurantsByLocation } from '../../api/userController';
import { RestaurantsList, Review } from '@utils/types';

export default function RestaurantFinder() {
  const { state } = useLocation();
  const [restaurants, setRestaurants] = useState<RestaurantsList>();

  const getRestaurants = async () => {
    setRestaurants(await getClosestRestaurantsByLocation(state));
  };

  useEffect(() => {
    getRestaurants();
  }, [state]);

  return (
    <>
      <SearchContainer></SearchContainer>

      <Typography gutterBottom variant="h5" component="div">
        {state.address}
      </Typography>

      {restaurants?.map(
        ({ name, rating, address, place_id, type, photo, reviews }) => (
          <>
            <RestaurantCard
              name={name}
              rating={rating}
              address={address}
              place_id={place_id}
            />
          </>
        )
      )}

      {/* <ModalReviews data={data}></ModalReviews> */}
    </>
  );
}
