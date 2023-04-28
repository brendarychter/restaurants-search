import { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Location, Place, Position, ErrorState } from 'types';
import { Button, CircularProgress, Typography } from '@mui/material';

export default function SearchContainer() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: ''
  });

  const getCurrentLocation = () => {
    setLoader(true);
    // move to utils
    setError({
      hasError: false,
      message: ''
    })
    
    const success = ({ coords }: Position) => {
      setLocation({
        lat: coords.latitude,
        lng: coords.longitude
      });
      setLoader(false);
    };

    const error = (error: GeolocationPositionError) => {
      setLoader(false)
      setError({
        hasError: true,
        message:
          error.code === error.PERMISSION_DENIED
            ? 'User denied permission to access location'
            : `Error while accessing user location: ${error.message}`
      });
    }
    navigator?.geolocation?.getCurrentPosition(success, error)
  };

  const placeSelection = (place: Place) => {
    setLocation({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: place.formatted_address
    });
  };

  return (
    <>
      <Autocomplete
        style={{ width: '100%' }}
        apiKey={import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY}
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
