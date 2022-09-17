import { Box, Flex, Select } from '@chakra-ui/react';
import Rounds from '../rounds/Rounds';
import { useContextState } from '../../common/context/state-context';
import { useEffect, useRef, useState } from 'react';
import { useWindowScrollPositions } from '../../common/utils';
import { ApiFixture, FixtureData } from '@hajduk-scores/api-interfaces';
import { FixtureToSubmit } from '../fixture-table/FixtureTable';

export type UserFixtureMapped = FixtureData & ApiFixture;

export interface RoundViewLayoutProps {
  onSubmit: (values: FixtureToSubmit) => void;
}

export function RoundViewLayout({ onSubmit }: RoundViewLayoutProps) {
  const { rounds, users, selectedUser, setSelectedUser, userFixtures } =
    useContextState();

  const usersSelectRef = useRef(null);
  const { scrollY } = useWindowScrollPositions();
  const scrolled = scrollY > usersSelectRef?.current?.clientHeight / 2;

  const [userFixturesMapped, setUserFixturesMapped] =
    useState<UserFixtureMapped[]>(null);

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
      <Flex flexDirection="column" width="100%">
        {users && users.length > 0 && (
          <Box
            ref={usersSelectRef}
            position={scrolled ? 'sticky' : 'relative'}
            boxShadow={scrolled ? '0px 10px 25px rgba(0, 0, 0, 0.05)' : 'none'}
            top={0}
            left={0}
            zIndex={1}
          >
            <Select
              placeholder="Select user"
              mb={4}
              borderRadius={4}
              onChange={(event) =>
                setSelectedUser(parseInt(event.target.value))
              }
              defaultValue={users[0].id}
              backgroundColor="#fff"
              maxWidth="65%"
              margin={scrolled && 0}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </Box>
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
