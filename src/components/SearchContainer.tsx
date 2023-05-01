import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Theme, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Autocomplete from 'react-google-autocomplete';
import {
  getLocationSuccess,
  getLocationStart,
  getLocationFailure
} from '../features/location/locationSlice';
import { Place, Position } from '@utils/types';
import { getAddressByCurrentLocation } from '../api/userController';
import { API_KEY } from '../utils/config';

export default function SearchContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.location);

  const getCurrentLocation = () => {
    dispatch(getLocationStart());
    const success = async ({ coords }: Position) => {
      try {
        dispatch(getLocationSuccess(await getAddressByCurrentLocation(coords)));
        navigate(`/search`);
      } catch (error) {
        dispatch(
          getLocationFailure(`Error setting current location: ${error}`)
        );
      }
    };
    const error = (err: GeolocationPositionError) => {
      dispatch(getLocationFailure(err.message));
    };

    navigator?.geolocation?.getCurrentPosition(success, error);
  };

  const placeSelection = (place: Place) => {
    if (place && place.geometry) {
      dispatch(
        getLocationSuccess({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address,
          place_id: place.place_id
        })
      );
      navigate(`/search`);
    } else {
      dispatch(getLocationFailure('Location not found'));
    }
  };
  
  return (
    <>
      <Autocomplete
        style={{ width: '100%' }}
        apiKey={API_KEY}
        onPlaceSelected={placeSelection}
        placeholder="Enter a city or an address"
        inputAutocompleteValue=''
        options={{
          types: ['geocode']
        }}
      />
      <Button variant="text" onClick={getCurrentLocation}>
        Use my current location
      </Button>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1
        }}
        open={loading}
        onClick={() => !loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {error && <Typography color="error">{error}</Typography>}
    </>
  );
}
