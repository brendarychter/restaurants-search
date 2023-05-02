import SearchContainer from '../../components/SearchContainer';
import RestaurantCard from '../../components/RestaurantCard';
import {
  Theme,
  Typography,
  CircularProgress,
  Backdrop,
  Grid
} from '@mui/material';
import { useEffect } from 'react';
import { getClosestRestaurantsByLocation } from '../../api/userController';
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
          <SearchContainer />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bolder',
              fontFamily: 'Rubik'
            }}
          >
            {location?.address}
          </Typography>
          {location && data ? (
            <Grid
              container
              justifyContent="center"
              sx={{ flexGrow: 1, margin: '0 auto' }}
              spacing={2}
              alignItems="center"
            >
              {data?.map(
                ({ name, rating, address, place_id, reviews, photo, type }) => (
                  <Grid item xs={12} sm={4} key={place_id}>
                    <RestaurantCard
                      name={name}
                      rating={rating}
                      address={address}
                      place_id={place_id}
                      reviews={reviews}
                      photo={photo}
                      type={type}
                    />
                  </Grid>
                )
              )}
            </Grid>
          ) : (
            <Typography variant="h5" component="div">
              No restaurants found for that location
            </Typography>
          )}
        </>
      )}
      {showModal && <ModalReviews />}
    </>
  );
}
