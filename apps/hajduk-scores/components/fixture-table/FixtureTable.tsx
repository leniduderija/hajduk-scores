import {
  Box,
  chakra,
  Flex,
  Input,
  Spinner,
  Image,
  Button,
} from '@chakra-ui/react';
import { hajdukId } from '../../common/services/matches-service';
import { useEffect, useState } from 'react';
import { FixtureData, Short, Team } from '@hajduk-scores/api-interfaces';

const StyledInput = chakra(Input, {
  baseStyle: {
    width: '100px',
    fontSize: '16px',
    textAlign: 'center',
  },
});

export function FixtureTable({
  round,
  onSubmit,
}: {
  round: any;
  onSubmit: (values: any) => void;
}) {
  const { fixture, teams, score, homeScore, awayScore, tip } = round;

  const [homeGoals, setHomeGoals] = useState<number | null>(homeScore);
  const [awayGoals, setAwayGoals] = useState<number | null>(awayScore);
  const [userPredictedTipValue, setUserPredictedTipValue] = useState<
    string | null
  >(tip);
  const [tipValue, setTipValue] = useState<string | null>(tip);

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

  const hajdukIsHomeTeam = (teams.home as Team).id === hajdukId;

  const handleSubmit = () => {
    const fixtureNumber = parseInt(round.league.round.split(' ')[3]);
    const fixture = {
      homeScore: homeGoals,
      awayScore: awayGoals,
      round: fixtureNumber,
      tip: parseInt(tipValue),
    };
    onSubmit(fixture);
  };

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
              boxSize="50px"
              src={(teams.home as Team).logo}
              alt={(teams.home as Team).name}
            />
            <Box ml={2}>{(teams.home as Team).name}</Box>
          </Flex>
          <StyledInput
            variant="flushed"
            type="number"
            min={0}
            value={homeGoals}
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
            value={awayGoals}
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
              boxSize="50px"
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
          <Flex flexDirection="row">
            <Box mr={1}>{score.fulltime.home as number}</Box>
            <Box>({score.halftime.home as number})</Box>
          </Flex>
          <Box mx={2}>:</Box>
          <Flex flexDirection="row">
            <Box mr={1}>{score.fulltime.away as number}</Box>
            <Box>({score.halftime.away as number})</Box>
          </Flex>
        </Flex>
      )}
      {fixture?.status.short === Short.Pst && (
        <Flex flexDirection="row">
          <Box fontWeight="bold" mr={4}>
            Odgođeno.
          </Box>
        </Flex>
      )}
      {fixture?.status.short === Short.NS && (
        <Flex flexDirection="row">
          <Button onClick={handleSubmit} disabled={!homeGoals || !awayGoals}>
            SAVE
          </Button>
        </Flex>
      )}
    </Flex>
  ) : (
    <Spinner />
  );
}

export default FixtureTable;
