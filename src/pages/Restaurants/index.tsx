import SearchContainer from '../../components/SearchContainer';
import RestaurantCard from '../../components/RestaurantCard';
import { Theme, Typography, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { getClosestRestaurantsByLocation } from '../../api/userController';
import Backdrop from '@mui/material/Backdrop';
import {
  getRestaurantsStart,
  getRestaurantsFailure,
  getRestaurantsSuccess
} from '../../features/restaurants/restaurantsSlice';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import ModalReviews from '../../components/Reviews';

export default function RestaurantFinder() {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location.data);
  const showModal = useSelector((state: RootState) => state.modal.showModal);

  const { data, loading } = useSelector(
    (state: RootState) => state.restaurants
  );

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  useEffect(() => {
    // TODO: Check if I can use useCallback
    const getRestaurants = async () => {
      dispatch(getRestaurantsStart());
      try {
        location &&
          dispatch(
            getRestaurantsSuccess(
              await getClosestRestaurantsByLocation(location)
            )
          );
      } catch (error) {
        dispatch(getRestaurantsFailure(`Error fetching restaurants: ${error}`));
      }
    };
    getRestaurants();
  }, [location, dispatch]);

  return (
    <>
      <SearchContainer></SearchContainer>
      {loading ? (
        <>
          <Backdrop
            // TODO: Componentize this
            sx={{
              color: '#fff',
              zIndex: (theme: Theme) => theme.zIndex.drawer + 1
            }}
            open={loading}
            onClick={() => !loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="div">
            {location?.address}
          </Typography>
          {location &&
            data?.map(
              ({ name, rating, address, place_id, reviews, photo, type }) => (
                <>
                  <RestaurantCard
                    name={name}
                    rating={rating}
                    address={address}
                    place_id={place_id}
                    key={place_id}
                    reviews={reviews}
                    photo={photo}
                    type={type}
                  />
                </>
              )
            )}
        </>
      )}
      {showModal && <ModalReviews></ModalReviews>}
    </>
  );
}
