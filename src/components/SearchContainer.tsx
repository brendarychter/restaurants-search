import { useState, useEffect } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Location, Place, Position, ErrorState } from '@utils/types';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  getLocationError,
  getAddressByCurrentLocation
} from '../api/userController';
import { API_KEY } from '../utils/config';

export default function SearchContainer() {
  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: ''
  });
  const navigate = useNavigate();

  const getCurrentLocation = () => {
    setLoader(true);

    setError({
      hasError: false,
      message: ''
    });

    const success = async ({ coords }: Position) => {
      setLocation(await getAddressByCurrentLocation(coords));
      setLoader(false);
    };

    const error = (err: GeolocationPositionError) => {
      setLoader(false);
      setError(getLocationError(err));
    };

    navigator?.geolocation?.getCurrentPosition(success, error);
  };

  const placeSelection = (place: Place) => {
    if (place && place.geometry) {
      setLocation({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        address: place.formatted_address,
        place_id: place.place_id
      });
    } else {
      setError({
        hasError: true,
        message: 'Location not found'
      });
    }
  };

  useEffect(() => {
    if (location) {
      navigate('/search', { state: location });
    }
  }, [location]);

  return (
    <>
      <Autocomplete
        style={{ width: '100%' }}
        apiKey={API_KEY}
        onPlaceSelected={placeSelection}
        placeholder="Enter a city or an address"
        options={{
          types: ['geocode']
        }}
      />
      <Button variant="text" onClick={getCurrentLocation}>
        {loader ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Use my current location'
        )}
      </Button>
      {error.hasError && <Typography color="error">{error.message}</Typography>}
    </>
  );
}
