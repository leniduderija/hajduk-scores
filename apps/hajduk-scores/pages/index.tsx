import { Container, Box, Text, Stack, useMediaQuery } from '@chakra-ui/react';
import matchesService from '../common/services/matches-service';
import { useEffect, useState } from 'react';
import { FixtureData } from '@hajduk-scores/api-interfaces';
import Rounds from '../components/rounds/Rounds';
import theme from '../common/theme';

export function Index() {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const [rounds, setRounds] = useState<FixtureData[] | null>(null);
  useEffect(() => {
    matchesService
      .getHajdukFixtures()
      .then((data) => {
        setRounds(data.response);
      })
      .catch((error) => {
        console.error('ERROR! Failed to fetch rounds: ', error);
      });
  }, []);
  return (
    <Container>
      <Stack spacing={4} my={8} direction={isSmallScreen ? 'column' : 'row'}>
        <Box width={isSmallScreen ? '100%' : '70%'}>
          {rounds && <Rounds rounds={rounds} />}
        </Box>
        <Box width={isSmallScreen ? '100%' : '30%'}>
          <Text fontSize="lg">LJESTVICA</Text>
        </Box>
      </Stack>
    </Container>
  );
}

export default Index;
