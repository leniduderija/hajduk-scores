import {
  Container,
  Box,
  Stack,
  Select,
  Flex,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ApiFixture } from '@hajduk-scores/api-interfaces';
import Rounds from '../components/rounds/Rounds';
import theme from '../common/theme';
import { fetcher, poster, updater } from '../common/http/http-client';
import { useContextState } from '../common/context/state-context';
import { Leaderboard } from '../components/leaderboard/Leaderboard';

async function fetchData(userId) {
  const fixturesData: ApiFixture[] = await fetcher(`/api/fixtures/${userId}`);
  return { userFixtures: fixturesData };
}

export function Index() {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const { rounds, users, selectedUser, setSelectedUser, leaderBoard } =
    useContextState();

  const [fixtures, setFixtures] = useState<ApiFixture[]>([]);
  const [userFixturesMapped, setUserFixturesMapped] = useState<any[]>(null);

  useEffect(() => {
    if (users && users.length > 0) {
      fetchData(users[0].id)
        .then((data) => {
          setFixtures(data.userFixtures);
        })
        .catch((err) => console.error(err));
    }
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      fetchData(selectedUser)
        .then((data) => {
          setFixtures(data.userFixtures);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (fixtures && selectedUser) {
      const mappedRoundsByUser = rounds?.map((round) => {
        const fixtureNumber = parseInt(round.league.round.split(' ')[3]);
        const userFixture = fixtures?.find(
          (fixture) => fixture.round === fixtureNumber
        );
        return { ...round, ...userFixture };
      });
      setUserFixturesMapped(mappedRoundsByUser);
    }
  }, [fixtures, selectedUser, rounds]);

  const handleSubmit = (values) => {
    async function createOrUpdateUser() {
      const existingRound = fixtures?.find(
        (fixture) => fixture.round === values.round
      );

      const valuesForSubmit = !!existingRound
        ? {
            ...values,
            fixtureId: existingRound.fixtureId,
            userId: selectedUser,
          }
        : {
            ...values,
            userId: selectedUser,
          };
      const usersData: any[] = !!existingRound
        ? await updater('/api/fixture/update', valuesForSubmit)
        : await poster('/api/fixture/create', valuesForSubmit);
      return { users: usersData };
    }
    createOrUpdateUser()
      .then(() => {
        fetchData(selectedUser)
          .then((data) => {
            setFixtures(data.userFixtures);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Stack spacing={4} my={8} direction={isSmallScreen ? 'column' : 'row'}>
        <Flex flexDirection="column" width={isSmallScreen ? '100%' : '70%'}>
          {users && users.length > 0 && (
            <Select
              placeholder="Select user"
              mb={4}
              borderRadius={4}
              onChange={(event) => setSelectedUser(event.target.value)}
              defaultValue={users[0].id}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          )}
          <Box>
            {userFixturesMapped ? (
              <Rounds rounds={userFixturesMapped} onSubmit={handleSubmit} />
            ) : null}
          </Box>
        </Flex>
        <Box width={isSmallScreen ? '100%' : '30%'}>
          <Leaderboard leaderboard={leaderBoard} />
        </Box>
      </Stack>
    </Container>
  );
}

export default Index;
