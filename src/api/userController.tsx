import { API_KEY, GOOGLE_API_ENDPOINT } from '../utils/config';
import {
  Location,
  GmapsRestaurantData,
  RestaurantsList
} from '@utils/types';

export const getAddressByCurrentLocation = async ({
  latitude,
  longitude
}: Location) => {
  const CURRENT_LOCATION_URL = `${GOOGLE_API_ENDPOINT}geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
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
};

export const getLocationError = (err: GeolocationPositionError) => {
  return {
    hasError: true,
    message:
      err.code === err.PERMISSION_DENIED
        ? 'User denied permission to access location'
        : `Error while accessing user location: ${err.message}`
  };
};

const sortByHighestReview = (data: GmapsRestaurantData[]) => {
  return data.slice(0, 10).sort((a, b) => b.rating - a.rating);
};

const extractProps = (data: GmapsRestaurantData[]): RestaurantsList => {
  return data.map(
    ({
      name,
      vicinity,
      types,
      photos,
      rating,
      place_id
    }: GmapsRestaurantData) => {
      const type = types?.length ? types[0] : undefined;
      const photo = photos?.length ? photos[0].photo_reference : undefined;
      return {
        name,
        address: vicinity,
        type,
        photo,
        rating,
        place_id
      };
    }
  );
};

export const getClosestRestaurantsByLocation = async ({
  latitude,
  longitude
}: Location) => {
  const NEARBY_SEARCH_URL = `https://cors-anywhere.herokuapp.com/${GOOGLE_API_ENDPOINT}place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${API_KEY}`;

  const res = await fetch(NEARBY_SEARCH_URL);
  const data = await res.json();
  if (data && data.results && data.results.length > 0) {
    const filteredData = sortByHighestReview(data.results);
    return extractProps(filteredData);
  }
};

