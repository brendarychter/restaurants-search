import SearchContainer from '../../components/SearchContainer';
import RestaurantCard from '../../components/RestaurantCard';
import { useLocation } from 'react-router-dom';

export default function RestaurantFinder() {
  // const location = useLocation();
  // console.log('Dureccion: ', location);
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
      score: 10
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
      score: 10
    }
  ];

  return (
    <>
      {/* Llamo al cuadro de busqueda para que se mantenga arriba y seguir buscando */}

      <SearchContainer></SearchContainer>
      <h2>aca va la ubicacion guardada en el estado</h2>
      {restaurants.map((res) => (
        <RestaurantCard restaurant={res} key={res.id} />
      ))}
    </>
  );
}
