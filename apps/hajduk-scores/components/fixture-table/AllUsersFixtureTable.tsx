import { Box, chakra, Flex, Input, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Short, User } from '@hajduk-scores/api-interfaces';
import { calculateTip } from '../../common/utils';

const StyledInput = chakra(Input, {
  baseStyle: {
    width: '100px',
    fontSize: '16px',
    textAlign: 'center',
  },
});

const Alert = chakra(Box, {
  baseStyle: ({ theme }) => ({
    color: theme.colors.palette.red.primary,
    fontSize: '10px',
    fontStyle: 'italic',
    position: 'absolute',
    bottom: -4,
  }),
});

export function AllUsersFixtureTable({
  round = {},
  user = null,
  onUpdateGoals,
}: {
  round: any;
  user: User;
  onUpdateGoals: ({
    home,
    away,
    userId,
  }: {
    home: number;
    away: number;
    userId: string;
  }) => void;
}) {
  const [homeGoals, setHomeGoals] = useState<number | null>(null);
  const [awayGoals, setAwayGoals] = useState<number | null>(null);

  const [awayGoalsError, setAwayGoalsError] = useState(false);
  const [homeGoalsError, setHomeGoalsError] = useState(false);

  const tipValue = useMemo(() => {
    if ((homeGoals || homeGoals === 0) && (awayGoals || awayGoals === 0)) {
      return calculateTip(homeGoals, awayGoals);
    } else return null;
  }, [homeGoals, awayGoals]);

  useEffect(() => {
    if (round) {
      setHomeGoals(round.homeScore ?? null);
      setAwayGoals(round.awayScore ?? null);
    }
  }, [round]);

  useEffect(() => {
    onUpdateGoals({ home: homeGoals, away: awayGoals, userId: user.id });
  }, [homeGoals, awayGoals]);

  if (!round) return null;

  return round ? (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      my={2}
      width="100%"
    >
      <Flex mr={2} alignItems="center">
        <Text fontSize="12px">{user.name}</Text>
      </Flex>
      <Flex flexDirection="row" alignItems="center">
        <Flex flexDirection="row" alignItems="center" mb={4}>
          <Flex
            flexDirection="row"
            mr={2}
            alignItems="center"
            position="relative"
          >
            <StyledInput
              variant="flushed"
              type="number"
              min={0}
              value={homeGoals ?? ''}
              onChange={(e) => {
                setHomeGoals(parseInt(e.target.value));
                if (homeGoals || homeGoals === 0) {
                  setHomeGoalsError(false);
                }
              }}
              disabled={round.fixture.status.short === Short.Ft}
              onBlur={() => {
                if (!homeGoals && homeGoals !== 0) {
                  setHomeGoalsError(true);
                } else {
                  setHomeGoalsError(false);
                }
              }}
              isInvalid={homeGoalsError}
            />
            {homeGoalsError && <Alert>Required</Alert>}
          </Flex>
          <Box mx={4}>:</Box>
          <Flex flexDirection="row" alignItems="center" position="relative">
            <StyledInput
              variant="flushed"
              type="number"
              min={0}
              value={awayGoals ?? ''}
              onChange={(e) => {
                setAwayGoals(parseInt(e.target.value));
                if (awayGoals || awayGoals === 0) {
                  setAwayGoalsError(false);
                }
              }}
              disabled={round.fixture.status.short === Short.Ft}
              onBlur={() => {
                if (!awayGoals && awayGoals !== 0) {
                  setAwayGoalsError(true);
                } else {
                  setAwayGoalsError(false);
                }
              }}
              isInvalid={awayGoalsError}
            />
            {awayGoalsError && <Alert>Required</Alert>}
          </Flex>
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="center"
          ml={4}
          justifyContent="flex-end"
        >
          <Box fontWeight="bold" ml={8} mr={2} fontSize="14px">
            TIP
          </Box>
          <StyledInput disabled value={tipValue || round.tip || 'Not Set'} />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Spinner />
  );
}

export default AllUsersFixtureTable;
