import { chakra, Flex, Box, Input, Spinner, Text } from '@chakra-ui/react';
import matchesService, {
  hajdukId,
} from '../../common/services/matches-service';
import { useEffect, useState } from 'react';
import { Fixture } from '@hajduk-scores/api-interfaces';

// const fetcher = (url) => fetch(url).then((res) => res.json());

const StyledInput = chakra(Input, {
  baseStyle: {
    width: '100px',
    fontSize: '16px',
    textAlign: 'center',
  },
});

export function FixtureTable({ round }: { round: number }) {
  const [hajdukFixture, setHajdukFixture] = useState<Fixture | null>(null);
  const [homeGoals, setHomeGoals] = useState<number | null>(null);
  const [awayGoals, setAwayGoals] = useState<number | null>(null);
  const [tipValue, setTipValue] = useState<string | null>(null);
  let [users, setUsers] = useState([]);

  // useEffect(async () => {
  //   let usersData = await fetcher('/api/getData');
  //   // setUsers(usersData.data);
  //   console.debug('users data ', usersData);
  // }, []);

  useEffect(() => {
    matchesService
      .getFixturesByRound(round)
      .then((data) => {
        const fixture = data.events.find((event) => {
          if (event.awayTeam.id === hajdukId || event.homeTeam.id === hajdukId)
            return event;
        });
        fixture && setHajdukFixture(fixture);
      })
      .catch((error) => {
        console.error('ERROR! Failed to fetch fixtures: ', error);
      });
  }, []);

  useEffect(() => {
    if ((homeGoals || homeGoals === 0) && (awayGoals || awayGoals === 0)) {
      if (homeGoals === awayGoals) {
        setTipValue('0');
      }
      if (homeGoals > awayGoals) {
        setTipValue('1');
      }
      if (homeGoals < awayGoals) {
        setTipValue('2');
      }
    }
  }, [homeGoals, awayGoals]);

  console.debug('hajduk fixture ', hajdukFixture);

  return hajdukFixture ? (
    <Flex flexDirection="column">
      <Flex flexDirection="row" alignItems="center" mb={4}>
        <Flex flexDirection="row" mr={2} alignItems="center">
          <Box
            fontSize="16px"
            mr={2}
            fontWeight={
              hajdukFixture.homeTeam.id === hajdukId ? 'bold' : 'normal'
            }
          >
            {hajdukFixture.homeTeam.name}
          </Box>
          <StyledInput
            variant="flushed"
            type="number"
            min={0}
            onChange={(e) => setHomeGoals(parseInt(e.target.value))}
            disabled={hajdukFixture.status.code === 100}
          />
        </Flex>
        <Box mx={4}>:</Box>
        <Flex flexDirection="row" alignItems="center">
          <Box
            fontSize="16px"
            mr={2}
            fontWeight={
              hajdukFixture.awayTeam.id === hajdukId ? 'bold' : 'normal'
            }
          >
            {hajdukFixture.awayTeam.name}
          </Box>
          <StyledInput
            variant="flushed"
            type="number"
            min={0}
            onChange={(e) => setAwayGoals(parseInt(e.target.value))}
            disabled={hajdukFixture.status.code === 100}
          />
        </Flex>
      </Flex>
      <Flex flexDirection="row" alignItems="center" my={4}>
        <Box fontWeight="bold" mr={8}>
          TIP
        </Box>
        <StyledInput disabled value={tipValue || 'Not Set'} />
      </Flex>
      {hajdukFixture?.status.code === 100 && (
        <Flex flexDirection="row">
          <Box fontWeight="bold" mr={4}>
            Konačan rezultat:
          </Box>
          <Box mx={2}>
            {hajdukFixture.homeScore.display} ({hajdukFixture.homeScore.period1}
            )
          </Box>
          <Box>:</Box>
          <Box mx={2}>
            {hajdukFixture.awayScore.display} ({hajdukFixture.awayScore.period1}
            )
          </Box>
        </Flex>
      )}
    </Flex>
  ) : (
    <Spinner />
  );
}

export default FixtureTable;
