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
  score: number;
};

export interface Restaurant {
  restaurant: Info;
}

export interface Place {
  formatted_address: string;
  id: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
  id: string;
}
