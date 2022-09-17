export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  fixtures: ApiFixture[];
}

export interface ApiFixture {
  fixtureId: number;
  round: number;
  tip: number;
  user: User;
  userId: number;
  homeScore: number;
  awayScore: number;
}

export interface RapidApiFixturesResponse {
  errors: string[];
  get: string;
  paging: Pagination;
  parameters: any;
  response: FixtureData[];
  results: number;
}

export interface Pagination {
  current: number;
  total: number;
}

export interface FixtureData {
  fixture: Fixture;
  league: League;
  teams: HomeAway;
  goals: HomeAway;
  score: Score;
}

export interface Fixture {
  id: number;
  referee: null | string;
  timezone: Timezone;
  date: Date;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
}

export interface Periods {
  first: number | null;
  second: number | null;
}

export interface Status {
  long: Long;
  short: Short;
  elapsed: number | null;
}

export enum Long {
  MatchFinished = 'Match Finished',
  MatchPostponed = 'Match Postponed',
  NotStarted = 'Not Started',
  TimeToBeDefined = 'Time to be defined',
}

export enum Short {
  Ft = 'FT',
  NS = 'NS',
  Pst = 'PST',
  Tbd = 'TBD',
}

export enum Timezone {
  UTC = 'UTC',
}

export interface Venue {
  id: number;
  name: string;
  city: string;
}

export interface HomeAway {
  home: Team | number | null;
  away: Team | number | null;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface League {
  id: number;
  name: Name;
  country: Country;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

export enum Country {
  Croatia = 'Croatia',
}

export enum Name {
  Hnl = 'HNL',
}

export interface Score {
  halftime: HomeAway;
  fulltime: HomeAway;
  extratime: HomeAway;
  penalty: HomeAway;
}
