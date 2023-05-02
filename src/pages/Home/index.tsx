import SearchContainer from '../../components/SearchContainer';
import { Typography, Box } from '@mui/material';
export default function Home() {
  return (
    <>
      <Box
        sx={{
          height: 300,
          textAlign: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bolder',
            fontFamily: 'Rubik'
          }}
          variant="h2"
        >
          small restaurants web
        </Typography>
        <Typography variant="h6">
          Brings you a list of restaurants in the location you want, sorted by
          the best rating. You can also see a list of reviews written by users.
          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Rubik', marginBottom: '1em' }}>
            Taste it!
          </Typography>
        </Typography>
        <Box sx={{width: '90%'}}>
          <SearchContainer />
        </Box>
      </Box>
    </>
  );
}
