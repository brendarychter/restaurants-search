type Review = {
  username?: string;
  text: string;
  id: string;
};

export type Info = {
  name: string;
  address: string;
  picture?: string;
  type?: string;
  reviews: Review[];
  id: string;
  rating: number;
};

export interface Restaurant {
  restaurant: Info;
}

// Ver si conviene unificsar estas intefaces
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
