import {
  Container,
  Stack,
  Button,
  Flex,
  useMediaQuery,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import { ApiFixture } from '@hajduk-scores/api-interfaces';
import theme from '../common/theme';
import { fetcher, poster, updater } from '../common/http/http-client';
import { useContextState } from '../common/context/state-context';
// import { Leaderboard } from '../components/leaderboard/Leaderboard';
import RoundViewLayout from '../components/round-view-layout/RoundViewLayout';
import UserViewLayout from '../components/user-view-layout/UserViewLayout';

async function fetchData() {
  const fixturesData: ApiFixture[] = await fetcher('/api/fixtures');
  return { allUserFixtures: fixturesData };
}

async function fetchUserData(userId) {
  const fixturesData: ApiFixture[] = await fetcher(`/api/fixtures/${userId}`);
  return { userFixtures: fixturesData };
}

export function Index() {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const toast = useToast();

  const [roundsView, setRoundsView] = useBoolean();

  const {
    selectedUser,
    leaderBoard,
    allUsersFixtures,
    setAllUsersFixtures,
    setUserFixtures,
  } = useContextState();

  const handleSubmit = (values) => {
    async function createOrUpdateUser() {
      const existingRound = allUsersFixtures?.find(
        (fixture) =>
          fixture.round === values.round && fixture.userId === selectedUser
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
        toast({
          title: 'Result saved.',
          description: '',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        fetchData()
          .then((data) => {
            setAllUsersFixtures(data.allUserFixtures);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: 'Result not saved.',
          description: 'Something happen. Try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleMultipleSubmit = (values) => {
    async function createOrUpdateFixtures(updateData, data) {
      const fixturesData: any[] = updateData
        ? await updater('/api/fixtures/update', data)
        : await poster('/api/fixtures/create', data);
      return { fixtures: fixturesData };
    }

    let valuesToSubmit = [];
    Object.keys(values).map((userId) => {
      const userResults = values[userId] !== {} ? values[userId] : null;
      const existingRound = allUsersFixtures?.find(
        (fixture) =>
          fixture.round === userResults.round && fixture.userId === userId
      );
      if (!!existingRound) {
        userResults.fixtureId = existingRound.fixtureId;

        if (
          existingRound.homeScore !== userResults.homeScore ||
          existingRound.awayScore !== userResults.awayScore
        ) {
          userResults.shouldUpdate = true;
        }
      }
      valuesToSubmit.push(userResults);
    });

    let valuesToUpdate = [];
    let valuesToCreate = [];

    valuesToSubmit.map((value) => {
      if (value.fixtureId) {
        if (value.shouldUpdate) {
          valuesToUpdate.push(value);
        }
      } else {
        valuesToCreate.push(value);
      }
    });

    if (valuesToUpdate && valuesToUpdate.length > 0) {
      createOrUpdateFixtures(true, valuesToUpdate)
        .then(() => {
          toast({
            title: 'Results saved.',
            description: '',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          fetchData()
            .then((data) => {
              setAllUsersFixtures(data.allUserFixtures);
            })
            .catch((err) => console.error(err));
          fetchUserData(selectedUser)
            .then((data) => {
              setUserFixtures(data.userFixtures);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: 'Result not saved.',
            description: 'Something happen. Try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }

    if (valuesToCreate && valuesToCreate.length > 0) {
      createOrUpdateFixtures(false, valuesToCreate)
        .then(() => {
          toast({
            title: 'Results saved.',
            description: 'Something happen. Try again.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          fetchData()
            .then((data) => {
              setAllUsersFixtures(data.allUserFixtures);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: 'Result not saved.',
            description: 'Something happen. Try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Container>
      <Flex flexDirection="row" my={2} justifyContent="flex-end">
        <Button mr={5} isActive={!roundsView} onClick={setRoundsView.off}>
          View by User
        </Button>
        <Button isActive={roundsView} onClick={setRoundsView.on}>
          View by Round number
        </Button>
      </Flex>
      <Stack spacing={0} my={8} direction={isSmallScreen ? 'column' : 'row'}>
        {roundsView ? (
          <RoundViewLayout onSubmit={handleSubmit} />
        ) : (
          <UserViewLayout onSubmit={handleMultipleSubmit} />
        )}
        {/*{!isSmallScreen && (*/}
        {/*  <Box width={isSmallScreen ? '100%' : '30%'}>*/}
        {/*    <Leaderboard leaderboard={leaderBoard} />*/}
        {/*  </Box>*/}
        {/*)}*/}
      </Stack>
    </Container>
  );
}

export default Index;
