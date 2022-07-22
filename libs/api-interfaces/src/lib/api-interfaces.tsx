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
