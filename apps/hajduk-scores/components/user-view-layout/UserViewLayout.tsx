import React from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  useMediaQuery,
} from '@chakra-ui/react';
import theme from '../../common/theme';
import { useContextState } from '../../common/context/state-context';
import { useEffect, useMemo, useState } from 'react';
import { calculateTip, findClosestRoundByDate } from '../../common/utils';
import { FixtureData, Short, Team } from '@hajduk-scores/api-interfaces';
import { hajdukId } from '../../common/services/matches-service';
import UserRounds from '../user-rounds/UserRounds';

export interface UserViewLayoutProps {
  onSubmit: (values) => void;
}

const CurrentRound = ({ round }) => {
  const { fixture, teams, score } = round;
  const hajdukIsHomeTeam = (teams?.home as Team)?.id === hajdukId;

  return (
    <>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        my={5}
        width="80%"
      >
        <Flex
          flexDirection="row"
          alignItems="center"
          fontSize="16px"
          mr={2}
          fontWeight={hajdukIsHomeTeam ? 'bold' : 'normal'}
          minWidth="40%"
        >
          <Image
            borderRadius="full"
            boxSize="50px"
            src={(teams.home as Team).logo}
            alt={(teams.home as Team).name}
          />
          <Box mx={2}>{(teams.home as Team).name}</Box>
        </Flex>
        {fixture?.status.short === Short.Ft ? (
          <Flex
            width="20%"
            flexDirection="row"
            justifyContent="space-between"
            mx={4}
          >
            <Box mr={1} fontWeight={hajdukIsHomeTeam ? 'bold' : 'normal'}>
              {score.fulltime.home as number}
            </Box>
            <Box fontWeight={hajdukIsHomeTeam ? 'bold' : 'normal'}>
              ({score.halftime.home as number})
            </Box>
            <Box mx={4}>:</Box>
            <Box mr={1} fontWeight={!hajdukIsHomeTeam ? 'bold' : 'normal'}>
              {score.fulltime.away as number}
            </Box>
            <Box fontWeight={!hajdukIsHomeTeam ? 'bold' : 'normal'}>
              ({score.halftime.away as number})
            </Box>
          </Flex>
        ) : (
          <Flex
            width="20%"
            flexDirection="row"
            justifyContent="space-between"
            mx={4}
          >
            {' '}
            -{' '}
          </Flex>
        )}
        <Flex
          flexDirection="row"
          alignItems="center"
          fontSize="16px"
          mr={2}
          fontWeight={!hajdukIsHomeTeam ? 'bold' : 'normal'}
          minWidth="40%"
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
      {fixture?.status.short === Short.Pst && (
        <Flex flexDirection="row">
          <Box fontWeight="bold" mr={4}>
            Odgođeno.
          </Box>
        </Flex>
      )}
    </>
  );
};

export function UserViewLayout({ onSubmit }: UserViewLayoutProps) {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const { rounds, users, allUsersFixtures } = useContextState();

  const currentRoundIndex = useMemo(
    () => findClosestRoundByDate(rounds),
    [rounds]
  );

  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [userFixturesMapped, setUserFixturesMapped] = useState<{}>(null);
  const [currentRoundData, setCurrentRoundData] = useState<FixtureData>(null);

  const [results, setResults] = useState({});

  useEffect(() => {
    if (rounds) {
      setSelectedRound(currentRoundIndex + 1);
    }
  }, [rounds, currentRoundIndex]);

  useEffect(() => {
    if (allUsersFixtures && rounds) {
      const roundsMapped = {};
      users.map((user) => {
        roundsMapped[user.id] = [];
        rounds?.map((round) => {
          const fixtureNumber = parseInt(round.league.round.split(' ')[3]);
          const userRound = allUsersFixtures?.find((fixture) => {
            return (
              fixture.round === fixtureNumber && fixture.userId === user.id
            );
          });
          if (userRound) {
            roundsMapped[user.id].push({ ...round, ...userRound });
          } else {
            roundsMapped[user.id].push({ ...round });
          }
        });
      });
      setUserFixturesMapped(roundsMapped);
    }
  }, [allUsersFixtures, rounds]);

  useEffect(() => {
    if (rounds && selectedRound) {
      const current = rounds?.find((round) => {
        const fixtureNumber = parseInt(round.league.round.split(' ')[3]);
        return fixtureNumber === selectedRound;
      });
      setCurrentRoundData(current);
    }
  }, [rounds, selectedRound]);

  useEffect(() => {
    const currentRoundFixtures = allUsersFixtures.filter(
      (fixture) => fixture.round === selectedRound
    );
    const newResults = { ...results };

    currentRoundFixtures.map((fixture) => {
      newResults[fixture.userId] = fixture;
    });
    setResults(newResults);
  }, [allUsersFixtures, selectedRound]);

  const handleUpdateGoals = ({ home, away, userId }) => {
    if ((home || home === 0) && (away || away === 0)) {
      const newResults = { ...results };
      const tip = calculateTip(home, away);

      newResults[userId] = {
        homeScore: home,
        awayScore: away,
        tip: parseInt(tip),
        round: selectedRound,
        userId,
      };
      setResults(newResults);
    }
  };

  return (
    <>
      <Flex flexDirection="column" width={isSmallScreen ? '100%' : '100%'}>
        <Flex flexDirection="column">
          <Box width="100px">
            {selectedRound && (
              <Select
                placeholder="Select round"
                mb={4}
                borderRadius={4}
                onChange={(event) =>
                  setSelectedRound(parseInt(event.target.value))
                }
                defaultValue={selectedRound}
              >
                {rounds?.map((round) => (
                  <option
                    key={round.fixture.id}
                    value={parseInt(round.league.round.split(' ')[3])}
                  >
                    Kolo {parseInt(round.league.round.split(' ')[3])}
                  </option>
                ))}
              </Select>
            )}
          </Box>
          {currentRoundData && <CurrentRound round={currentRoundData} />}
        </Flex>

        <Box>
          {userFixturesMapped ? (
            <Flex flexDirection="column">
              {Object.keys(userFixturesMapped).map((userId, index) => (
                <React.Fragment key={`${userId}_${index}`}>
                  <UserRounds
                    rounds={userFixturesMapped[userId]}
                    users={users}
                    userId={userId}
                    selectedRound={selectedRound}
                    onUpdateGoals={handleUpdateGoals}
                  />
                </React.Fragment>
              ))}
              {currentRoundData?.fixture?.status.short === Short.NS && (
                <Flex flexDirection="row" justifyContent="flex-end">
                  <Button onClick={() => onSubmit(results)}>SAVE</Button>
                </Flex>
              )}
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </>
  );
}

export default UserViewLayout;
