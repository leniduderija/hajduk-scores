import {
  Box,
  chakra,
  Flex,
  Input,
  Spinner,
  Image,
  Button,
  useMediaQuery,
} from '@chakra-ui/react';
import { hajdukId } from '../../common/services/matches-service';
import { useEffect, useState } from 'react';
import { ApiFixture, Short, Team } from '@hajduk-scores/api-interfaces';
import { calculateTip } from '../../common/utils';
import theme from '../../common/theme';
import { UserFixtureMapped } from '../round-view-layout/RoundViewLayout';

export type FixtureToSubmit = Omit<ApiFixture, 'fixtureId' | 'user' | 'userId'>;

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
  round: UserFixtureMapped;
  onSubmit: (values: FixtureToSubmit) => void;
}) {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const { fixture, teams, score, homeScore, awayScore, tip } = round;

  const [homeGoals, setHomeGoals] = useState<number | null>(homeScore);
  const [awayGoals, setAwayGoals] = useState<number | null>(awayScore);
  const [tipValue, setTipValue] = useState<string | null>(tip);

  useEffect(() => {
    if ((homeGoals || homeGoals === 0) && (awayGoals || awayGoals === 0)) {
      setTipValue(calculateTip(homeGoals, awayGoals));
    }
  }, [homeGoals, awayGoals]);

  const hajdukIsHomeTeam = (teams?.home as Team)?.id === hajdukId;

  const handleSubmit = () => {
    const fixtureNumber = parseInt(round.league.round.split(' ')[3]);
    const fixture: FixtureToSubmit = {
      homeScore: homeGoals,
      awayScore: awayGoals,
      round: fixtureNumber,
      tip: parseInt(tipValue),
    };
    onSubmit(fixture);
  };

  const disabledSubmit =
    (!homeGoals && homeGoals !== 0) ||
    (!awayGoals && awayGoals !== 0) ||
    (homeGoals === homeScore && awayGoals === awayScore);

  return round ? (
    <Flex flexDirection="column">
      <Flex
        flexDirection={isSmallScreen ? 'column' : 'row'}
        alignItems={isSmallScreen ? 'flex-start' : 'center'}
        mb={4}
      >
        <Flex
          flexDirection="row"
          mr={2}
          alignItems="center"
          mb={isSmallScreen ? 8 : 0}
          width={isSmallScreen ? '100%' : 'auto'}
        >
          <Flex
            flexDirection="row"
            alignItems="center"
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
        {!isSmallScreen && <Box mx={4}>:</Box>}
        <Flex
          flexDirection="row"
          alignItems={isSmallScreen ? 'flex-start' : 'center'}
          justifyContent={isSmallScreen ? 'space-between' : 'center'}
          width={isSmallScreen ? '100%' : 'auto'}
        >
          {!isSmallScreen && (
            <StyledInput
              variant="flushed"
              type="number"
              min={0}
              value={awayGoals}
              onChange={(e) => setAwayGoals(parseInt(e.target.value))}
              disabled={fixture.status.short === Short.Ft}
            />
          )}
          <Flex
            flexDirection="row"
            alignItems="center"
            fontSize="16px"
            ml={isSmallScreen ? 0 : 2}
            mr={isSmallScreen ? 2 : 0}
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
          {isSmallScreen && (
            <StyledInput
              variant="flushed"
              type="number"
              min={0}
              value={awayGoals}
              onChange={(e) => setAwayGoals(parseInt(e.target.value))}
              disabled={fixture.status.short === Short.Ft}
            />
          )}
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
        <Flex flexDirection="row" justifyContent="flex-end">
          <Button onClick={handleSubmit} disabled={disabledSubmit}>
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
