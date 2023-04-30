import { Location } from 'types';
import { API_KEY } from '../utils/config';

export const getAddressByCurrentLocation = async ({
  latitude,
  longitude
}: Location) => {
  const CURRENT_LOCATION_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
  const response = await fetch(CURRENT_LOCATION_URL);
  const data = await response.json();
  if (data && data.results && data.results.length > 0) {
    return {
      latitude,
      longitude,
      address: data.results[0].formatted_address as string,
      place_id: data.results[0].place_id as string
    };
  }
}

export const getLocationError = (err: GeolocationPositionError) => {
  return {
    hasError: true,
    message:
      err.code === err.PERMISSION_DENIED
        ? 'User denied permission to access location'
        : `Error while accessing user location: ${err.message}`
  };
};
