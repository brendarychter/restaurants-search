import { API_KEY, GOOGLE_API_ENDPOINT } from '../utils/config';
import {
  Location,
  GmapsRestaurantData,
  RestaurantsList,
  Restaurant,
  Review
} from '@utils/types';

export const getAddressByCurrentLocation = async ({
  latitude,
  longitude
}: Location) => {
  try {
    const CURRENT_LOCATION_URL = `${GOOGLE_API_ENDPOINT}/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
    const response = await fetch(CURRENT_LOCATION_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      return {
        latitude,
        longitude,
        address: data.results[0].formatted_address as string,
        place_id: data.results[0].place_id as string
      };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching current location address:', error);
    throw error;
  }
};

const sortByHighestReview = (data: GmapsRestaurantData[]) => {
  return data.slice(0, 10).sort((a, b) => b.rating - a.rating);
};

const extractProps = async (
  data: GmapsRestaurantData[]
): Promise<RestaurantsList> => {
  const restaurants = data.map(async (res: GmapsRestaurantData) => {
    const { name, vicinity, types, photos, rating, place_id } = res;
    const photo = photos && photos?.length
      ? getPhotoUrl(photos[0].photo_reference)
      : undefined;
    const reviews = await getReviews(place_id);
    return {
      name,
      address: vicinity,
      type: types?.length ? types[0] : undefined,
      photo,
      rating,
      place_id,
      reviews
    } as Restaurant;
  });
  return Promise.all(restaurants);
};

export const getClosestRestaurantsByLocation = async ({
  latitude,
  longitude
}: Location) => {
  const NEARBY_SEARCH_URL = `https://cors-anywhere.herokuapp.com/${GOOGLE_API_ENDPOINT}/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${API_KEY}`;
  try {
    const res = await fetch(NEARBY_SEARCH_URL);
    const data = await res.json();
    if (data && data.results && data.results.length > 0) {
      const filteredData = sortByHighestReview(data.results);
      return extractProps(filteredData);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    throw error;
  }
};

export const getPhotoUrl = async (ref: string) => {
  const PHOTO_URL = `${GOOGLE_API_ENDPOINT}/place/photo?maxwidth=400&photo_reference=${ref}&key=${API_KEY}`;
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${PHOTO_URL}`, {
      headers: {
        'Origin': 'https://cors-anywhere.herokuapp.com',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    const photo_url_string = response.url;
    return photo_url_string;
  } catch (error) {
    console.error('Error fetching restaurant photo:', error);
    throw error;
  }
};

export const getReviews = async (place_id: string) => {
  const REVIEWS_URL = `https://cors-anywhere.herokuapp.com/${GOOGLE_API_ENDPOINT}/place/details/json?place_id=${place_id}&key=${API_KEY}`;

  try {
    const response = await fetch(REVIEWS_URL);
    const data = await response.json();
    const reviews = data.result?.reviews;
    if (reviews && reviews.length > 0) {
      return reviews
        .slice(0, 10)
        .map(({ author_name, text }: Review) => {
          return { author_name, text };
        });
    }
  } catch (error) {
    console.error('Error fetching restaurant photo:', error);
    throw error;
  }
};
