import { Box, Flex, Select, useMediaQuery } from '@chakra-ui/react';
import Rounds from '../rounds/Rounds';
import theme from '../../common/theme';
import { useContextState } from '../../common/context/state-context';
import { useEffect, useState } from 'react';

export interface RoundViewLayoutProps {
  onSubmit: (values) => void;
}

export function RoundViewLayout({ onSubmit }: RoundViewLayoutProps) {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const { rounds, users, selectedUser, setSelectedUser, userFixtures } =
    useContextState();

  const [userFixturesMapped, setUserFixturesMapped] = useState<any[]>(null);

  useEffect(() => {
    if (userFixtures && selectedUser) {
      const mappedRoundsByUser = rounds?.map((round) => {
        const fixtureNumber = parseInt(round.league.round.split(' ')[3]);
        const userFixture = userFixtures?.find(
          (fixture) => fixture.round === fixtureNumber
        );
        return { ...round, ...userFixture };
      });
      setUserFixturesMapped(mappedRoundsByUser);
    }
  }, [userFixtures, selectedUser, rounds]);

  return (
    <>
      <Flex flexDirection="column" width={isSmallScreen ? '100%' : '100%'}>
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
            <Rounds rounds={userFixturesMapped} onSubmit={onSubmit} />
          ) : null}
        </Box>
      </Flex>
    </>
  );
}

export default RoundViewLayout;
