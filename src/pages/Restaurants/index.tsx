import SearchContainer from '../../components/SearchContainer';
import RestaurantCard from '../../components/RestaurantCard';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function RestaurantFinder() {
  const { state } = useLocation();
  const API_KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY;

  const getClosestRestaurantsByLocation = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.latitude},${state.longitude}&radius=1500&type=restaurant&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.results && data.results.length > 0) {
      console.log(data.results);
    }
  };


  useEffect(() => {
    getClosestRestaurantsByLocation();
  }, [state]);

  const restaurants = [
    {
      name: 'Benaim',
      address: 'cordoba 4321',
      picture: '',
      reviews: [
        {
          text: 'richards',
          id: '14',
          username: 'bla'
        }
      ],
      id: '1',
      rating: 10
    },
    {
      name: 'Benaim2',
      address: 'cordoba 4321',
      picture: '',
      reviews: [
        {
          text: 'richards',
          id: '145',
          username: 'bla'
        }
      ],
      id: '2',
      rating: 10
    }
  ];

  return (
    <>
      {/* Llamo al cuadro de busqueda para que se mantenga arriba y seguir buscando */}
      <SearchContainer></SearchContainer>

      <Typography gutterBottom variant="h5" component="div">
        {state.address}
      </Typography>
      {restaurants.map((res) => (
        <RestaurantCard restaurant={res} key={res.id} />
      ))}
    </>
  );
}
