import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ApiFixture, FixtureData, User } from '@hajduk-scores/api-interfaces';
import matchesService from '../services/matches-service';
import { fetcher } from '../http/http-client';

interface StateProviderProps {
  children: ReactNode;
}

type State = {
  rounds: FixtureData[];
  users: User[];
  allUsersFixtures: ApiFixture[];
  userFixtures: ApiFixture[];
  leaderBoard: {
    user: User;
    totalUserPoints: number;
  }[];
  selectedUser: string;
  setSelectedUser: (value: string) => void;
  setUserFixtures: (value: ApiFixture[]) => void;
  setAllUsersFixtures: (value: ApiFixture[]) => void;
};

const StateContext = createContext<State>({
  rounds: null,
  users: null,
  allUsersFixtures: null,
  userFixtures: null,
  leaderBoard: null,
  selectedUser: null,
  setSelectedUser: () => ({}),
  setUserFixtures: () => ({}),
  setAllUsersFixtures: () => ({}),
});

async function fetchFullData() {
  const usersData: User[] = await fetcher('/api/users');
  const fixturesData: ApiFixture[] = await fetcher('/api/fixtures');
  return { users: usersData, allUsersFixtures: fixturesData };
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const [rounds, setRounds] = useState<FixtureData[] | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [allUsersFixtures, setAllUsersFixtures] = useState<ApiFixture[]>([]);
  const [userFixtures, setUserFixtures] = useState<ApiFixture[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>();

  useEffect(() => {
    matchesService
      .getHajdukFixtures()
      .then((data) => {
        setRounds(data.response);
      })
      .catch((error) => {
        console.error('ERROR! Failed to fetch rounds: ', error);
      });

    fetchFullData()
      .then((data) => {
        setUsers(data.users);
        setAllUsersFixtures(data.allUsersFixtures);
        setSelectedUser(data.users[0].id);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    async function fetchData(userId) {
      const fixturesData: ApiFixture[] = await fetcher(
        `/api/fixtures/${userId}`
      );
      return { userFixtures: fixturesData };
    }

    if (selectedUser) {
      fetchData(selectedUser)
        .then((data) => {
          setUserFixtures(data.userFixtures);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedUser]);

  // const currentRoundIndex = useMemo(
  //   () => findClosestRoundByDate(rounds),
  //   [rounds]
  // );

  const leaderBoardScores = useMemo(() => {
    const usersMap = {};
    allUsersFixtures?.map((fixture) => {
      if (usersMap[fixture.userId]) {
        usersMap[fixture.userId].push(fixture);
      } else {
        usersMap[fixture.userId] = [fixture];
      }
    });
    const leaderBoardArray = Object.keys(usersMap).map((key) => {
      let totalUserPoints = 0;
      usersMap[key].map((fixture) => {
        const playedRound = rounds?.find(
          (round) =>
            parseInt(round.league.round.split(' ')[3]) === fixture.round
        );
        if (playedRound) {
          const endResultHomeGoals = playedRound.score.fulltime.home;
          const endResultAwayGoals = playedRound.score.fulltime.away;
          const endResultTip =
            endResultHomeGoals === endResultAwayGoals
              ? 0
              : endResultHomeGoals > endResultAwayGoals
              ? 1
              : 2;

          const homePoints = fixture.homeScore === endResultHomeGoals;
          const awayPoints = fixture.awayScore === endResultAwayGoals;
          const tipPoints = fixture.tip === endResultTip;

          fixture.totalPoints =
            homePoints && awayPoints ? 3 : tipPoints ? 1 : 0;

          totalUserPoints += fixture.totalPoints;
        }
        return fixture;
      });
      usersMap[key] = {
        ...usersMap[key],
        totalUserPoints,
      };
      return {
        user: users.find((user) => user.id === key),
        totalUserPoints,
      };
    });
    return leaderBoardArray.sort(
      (a, b) => b.totalUserPoints - a.totalUserPoints
    );
  }, [allUsersFixtures, users, rounds]);

  const refreshFixtureData = () => {
    async function fetchData() {
      const fixturesData: ApiFixture[] = await fetcher(`/api/fixtures`);
      return { userFixtures: fixturesData };
    }

    fetchData()
      .then((data) => {
        setUserFixtures(data.userFixtures);
      })
      .catch((err) => console.error(err));
  };

  const value = useMemo(() => {
    return {
      rounds,
      users,
      allUsersFixtures,
      userFixtures,
      selectedUser,
      setSelectedUser,
      setUserFixtures,
      setAllUsersFixtures,
      leaderBoard: leaderBoardScores,
      onRefreshFixtureData: refreshFixtureData,
    };
  }, [
    rounds,
    users,
    allUsersFixtures,
    userFixtures,
    selectedUser,
    leaderBoardScores,
  ]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useContextState = () => useContext(StateContext);
