import { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Location, Place } from 'types';
import Button from '@mui/material/Button';

export default function SearchContainer() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loader, setLoader] = useState<boolean>(false);


  const getCurrentLocation = () => {
    console.log(navigator.geolocation);
  };

  const placeSelection = (place: Place) => {
    setLocation({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: place.formatted_address,
      id: place.id
    });
  };

  return (
    <>
      <Autocomplete
        style={{ width: '100%', fontFamily: 'Helvetica' }}
        apiKey={import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY}
        onPlaceSelected={placeSelection}
        placeholder="Enter a city or an address"
        options={{
          types: ['geocode']
        }}
      />
      <Button variant="text" onClick={getCurrentLocation}>
        Use my current location
      </Button>
    </>
  );
}
