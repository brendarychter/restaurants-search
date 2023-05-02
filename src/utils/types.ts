export type Review = {
  author_name: string;
  text: string;
};
export type Reviews = Review[];

export interface GmapsRestaurantData  {
  name: string;
  types?: string[];
  photos?: any;
  rating: number;
  vicinity: string;
  place_id: string;
}

export interface Restaurant {
  name: string;
  address: string;
  place_id: string;
  rating: number;
  photo?: string | undefined;
  type?: string | undefined;
  reviews?: Review[];
}
export type RestaurantsList = Restaurant[];

export interface Place {
  formatted_address: string;
  place_id: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}
export interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  place_id?: string;
}
