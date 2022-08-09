import { Box, chakra, Flex, Input, Spinner, Image } from '@chakra-ui/react';
import { hajdukId } from '../../common/services/matches-service';
import { useEffect, useState } from 'react';
import { FixtureData, Short, Team } from '@hajduk-scores/api-interfaces';

// const fetcher = (url) => fetch(url).then((res) => res.json());

const StyledInput = chakra(Input, {
  baseStyle: {
    width: '100px',
    fontSize: '16px',
    textAlign: 'center',
  },
});

export function FixtureTable({ round }: { round: FixtureData }) {
  console.debug('Fixture table round ', round);
  const { goals, fixture, teams, score } = round;

  const [homeGoals, setHomeGoals] = useState<number | null>(null);
  const [awayGoals, setAwayGoals] = useState<number | null>(null);
  const [tipValue, setTipValue] = useState<string | null>(null);
  // const [users, setUsers] = useState([]);

  // useEffect(async () => {
  //   let usersData = await fetcher('/api/getData');
  //   // setUsers(usersData.data);
  //   console.debug('users data ', usersData);
  // }, []);

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

  // const [users, setUsers] = useState([]);

  // useEffect(async () => {
  //   let usersData = await fetcher('/api/getData');
  //   // setUsers(usersData.data);
  //   console.debug('users data ', usersData);
  // }, []);

  const hajdukIsHomeTeam = (teams.home as Team).id === hajdukId;

  console.debug('hajduk fixture ', round);

  return round ? (
    <Flex flexDirection="column">
      <Flex flexDirection="row" alignItems="center" mb={4}>
        <Flex flexDirection="row" mr={2} alignItems="center">
          <Flex
            flexDirection="row"
            fontSize="16px"
            mr={2}
            fontWeight={hajdukIsHomeTeam ? 'bold' : 'normal'}
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={(teams.home as Team).logo}
              alt={(teams.home as Team).name}
            />
            <Box ml={2}>{(teams.home as Team).name}</Box>
          </Flex>
          <StyledInput
            variant="flushed"
            type="number"
            min={0}
            onChange={(e) => setHomeGoals(parseInt(e.target.value))}
            disabled={fixture.status.short === Short.Ft}
          />
        </Flex>
        <Box mx={4}>:</Box>
        <Flex flexDirection="row" alignItems="center">
          <StyledInput
            variant="flushed"
            type="number"
            min={0}
            onChange={(e) => setAwayGoals(parseInt(e.target.value))}
            disabled={fixture.status.short === Short.Ft}
          />
          <Flex
            flexDirection="row"
            fontSize="16px"
            ml={2}
            fontWeight={!hajdukIsHomeTeam ? 'bold' : 'normal'}
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={(teams.away as Team).logo}
              alt={(teams.away as Team).name}
            />
            <Box ml={2}>{(teams.away as Team).name}</Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDirection="row" alignItems="center" my={4}>
        <Box fontWeight="bold" mr={8}>
          TIP
        </Box>
        <StyledInput disabled value={tipValue || 'Not Set'} />
      </Flex>
      {fixture?.status.short === Short.Ft && (
        <Flex flexDirection="row">
          <Box fontWeight="bold" mr={4}>
            Konačan rezultat:
          </Box>
          <Box mx={2}>
            {score.fulltime.home} ({score.halftime.home})
          </Box>
          <Box>:</Box>
          <Box mx={2}>
            {score.fulltime.away} ({score.halftime.away})
          </Box>
        </Flex>
      )}
    </Flex>
  ) : (
    <Spinner />
  );
}

export default FixtureTable;
