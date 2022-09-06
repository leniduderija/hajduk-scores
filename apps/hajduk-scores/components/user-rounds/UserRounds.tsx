import AllUsersFixtureTable from '../fixture-table/AllUsersFixtureTable';
import { User } from '@hajduk-scores/api-interfaces';
import { useEffect, useState } from 'react';

export function UserRounds({
  rounds,
  users,
  userId,
  selectedRound,
  onUpdateGoals,
}: {
  rounds: any[];
  users: User[];
  userId: string;
  selectedRound: number;
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
  const userData = users.find((user) => user.id === userId);

  const [userRound, setUserRound] = useState(null);

  useEffect(() => {
    const round =
      rounds.find(
        (fixture) =>
          parseInt(fixture.league.round.split(' ')[3]) === selectedRound
      ) || null;
    setUserRound(round);
  }, [rounds, selectedRound]);

  return (
    <AllUsersFixtureTable
      round={userRound}
      user={userData}
      onUpdateGoals={onUpdateGoals}
    />
  );
}

export default UserRounds;
