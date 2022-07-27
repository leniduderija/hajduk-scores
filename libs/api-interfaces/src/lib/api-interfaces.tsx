export interface League {
  uniqueTournament: UniqueTournament;
}

export interface UniqueTournament {
  name: string;
  slug: string;
  primaryColorHex: string;
  secondaryColorHex: string;
  logo: Logo;
  category: Category;
  userCount: number;
  tier: number;
  titleHolder: TitleHolder;
  titleHolderTitles: number;
  mostTitles: number;
  mostTitlesTeams: TitleHolder[];
  linkedUniqueTournaments: any[];
  hasStandingsGroups: boolean;
  hasRounds: boolean;
  hasPlayoffSeries: boolean;
  upperDivisions: any[];
  lowerDivisions: LowerDivision[];
  hasDisabledHomeAwayStandings: boolean;
  hasPositionGraph: boolean;
  id: number;
  startDateTimestamp: number;
  endDateTimestamp: number;
  displayInverseHomeAwayTeams: boolean;
}

export interface Category {
  name: string;
  slug: string;
  sport: Sport;
  id: number;
  flag: string;
  alpha2: string;
}

export interface Sport {
  name: string;
  slug: string;
  id: number;
}

export interface Logo {
  md5: string;
  id: number;
}

export interface LowerDivision {
  name: string;
  slug: string;
  primaryColorHex: string;
  secondaryColorHex: string;
  logo: Logo;
  category: Category;
  tier: number;
  hasRounds: boolean;
  hasPlayoffSeries: boolean;
  hasDisabledHomeAwayStandings: boolean;
  hasPositionGraph: boolean;
  id: number;
  startDateTimestamp: number;
  endDateTimestamp: number;
  displayInverseHomeAwayTeams: boolean;
}

export interface TitleHolder {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: Sport;
  userCount: number;
  nameCode: string;
  disabled: boolean;
  national: boolean;
  type: number;
  id: number;
  teamColors: TeamColors;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface Round {
  round: number;
}

export interface RoundsInterface {
  currentRound: Round;
  rounds: Round[];
}

export interface FixturesByRound {
  events: Fixture[];
  hasNextPage: boolean;
}

export interface Fixture {
  tournament: Tournament;
  roundInfo: RoundInfo;
  customId: string;
  status: Status;
  winnerCode: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  time: Time;
  changes: Changes;
  hasGlobalHighlights: boolean;
  hasEventPlayerStatistics?: boolean;
  hasEventPlayerHeatMap?: boolean;
  id: number;
  awayRedCards?: number;
  startTimestamp: number;
  slug: string;
  finalResultOnly: boolean;
}

export interface Score {
  current?: number;
  display?: number;
  period1?: number;
  period2?: number;
  normaltime?: number;
}

export interface Team {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: Sport;
  userCount: number;
  nameCode: string;
  disabled?: boolean;
  national: boolean;
  type: number;
  id: number;
  subTeams: any[];
  teamColors: TeamColors;
}

export interface Sport {
  name: string;
  slug: string;
  id: number;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface Changes {
  changes?: string[];
  changeTimestamp: number;
}

export interface RoundInfo {
  round: number;
}

export interface Status {
  code: number;
  description: string;
  type: string;
}

export interface Time {
  injuryTime1?: number;
  injuryTime2?: number;
  currentPeriodStartTimestamp?: number;
}

export interface Tournament {
  name: string;
  slug: string;
  category: Category;
  uniqueTournament: UniqueTournament;
  priority: number;
  id: number;
}

export interface Category {
  name: string;
  slug: string;
  sport: Sport;
  id: number;
  flag: string;
  alpha2: string;
}

export interface UniqueTournament {
  name: string;
  slug: string;
  category: Category;
  userCount: number;
  hasPositionGraph: boolean;
  id: number;
  hasEventPlayerStatistics: boolean;
  displayInverseHomeAwayTeams: boolean;
}
