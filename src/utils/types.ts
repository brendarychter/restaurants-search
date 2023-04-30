type Review = {
  username?: string;
  text: string;
  id: string;
};

export interface GmapsRestaurantData  {
  name: string;
  types?: string[];
  photos?: any[];
  rating: number;
  vicinity: string;
  place_id: string;
}


export interface Restaurant {
  name: string;
  address: string;
  photo?: string | undefined;
  type?: string | undefined;
  reviews?: Review[];
  place_id: string;
  rating: number;
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
