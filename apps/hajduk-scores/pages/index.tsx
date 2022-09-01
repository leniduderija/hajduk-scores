import {
  Container,
  Box,
  Text,
  Stack,
  Select,
  Flex,
  useMediaQuery,
} from '@chakra-ui/react';
import matchesService from '../common/services/matches-service';
import { useEffect, useState } from 'react';
import { ApiFixture, FixtureData, User } from '@hajduk-scores/api-interfaces';
import Rounds from '../components/rounds/Rounds';
import theme from '../common/theme';
import { fetcher, poster } from '../common/http/http-client';

async function fetchData(userId) {
  const fixturesData: ApiFixture[] = await fetcher(`/api/fixtures/${userId}`);
  return { userFixtures: fixturesData };
}

export function Index() {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const [rounds, setRounds] = useState<FixtureData[] | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [fixtures, setFixtures] = useState<ApiFixture[]>([]);
  const [userFixturesMapped, setUserFixturesMapped] = useState<any[]>(null);

  const [selectedUser, setSelectedUser] = useState<string | null>();

  useEffect(() => {
    matchesService
      .getHajdukFixtures()
      .then((data) => {
        setRounds(data.response);
      })
      .catch((error) => {
        console.error('ERROR! Failed to fetch rounds: ', error);
      });

    async function fetchUsers() {
      const usersData: User[] = await fetcher('/api/users');
      // const fixturesData: ApiFixture[] = await fetcher('/api/fixtures');
      // return { users: usersData, fixtures: fixturesData };
      return { users: usersData };
    }
    fetchUsers()
      .then((data) => {
        setUsers(data.users);
        // setFixtures(data.fixtures);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      setSelectedUser(users[0].id);
      setFixtures(null);
      fetchData(users[0].id)
        .then((data) => {
          setFixtures(data.userFixtures);
        })
        .catch((err) => console.error(err));
    }
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      // first we reset fixtures
      setFixtures(null);
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
    async function createUser() {
      const valuesForSubmit = {
        ...values,
        userId: selectedUser,
      };
      const usersData: any[] = await poster(
        '/api/fixture/create',
        valuesForSubmit
      );
      return { users: usersData };
    }
    createUser()
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
          <Text fontSize="lg">LJESTVICA</Text>
        </Box>
      </Stack>
    </Container>
  );
}

export default Index;
