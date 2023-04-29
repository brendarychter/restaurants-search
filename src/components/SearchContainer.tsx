import { useState, useEffect } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Location, Place, Position, ErrorState } from 'types';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SearchContainer() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: ''
  });
  const API_KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY;
  const navigate = useNavigate();

  const getCurrentLocation = () => {
    setLoader(true);

    setError({
      hasError: false,
      message: ''
    });

    const success = ({ coords }: Position) => {
      getAddressByCurrentLocation(coords);
      setLoader(false);
    };

    const getAddressByCurrentLocation = async ({
      latitude,
      longitude
    }: Location) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.results && data.results.length > 0)
        setLocation({
          latitude: latitude,
          longitude: longitude,
          address: data.results[0].formatted_address
        });
    };

    const error = (error: GeolocationPositionError) => {
      setLoader(false);
      setError({
        hasError: true,
        message:
          error.code === error.PERMISSION_DENIED
            ? 'User denied permission to access location'
            : `Error while accessing user location: ${error.message}`
      });
    };
    navigator?.geolocation?.getCurrentPosition(success, error);
  };

  const placeSelection = (place: Place) => {
    setLocation({
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      address: place.formatted_address
    });
  };

  useEffect(() => {
    console.log(location)
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
