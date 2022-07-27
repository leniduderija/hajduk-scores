/* eslint-disable import/no-anonymous-default-export */
import httpClient from '../http/http-client';
import {
  FixturesByRound,
  League,
  RoundsInterface,
} from '@hajduk-scores/api-interfaces';

const croatianLeagueId = 170;
const season2022Id = 42138;
export const hajdukId = 2036;

const getLeagueData = (): Promise<League> => {
  return httpClient
    .get(`unique-tournament/${croatianLeagueId}`)
    .then((response) => response.data);
};

const getAllSeasons = (): Promise<any> => {
  return httpClient
    .get(`unique-tournament/${croatianLeagueId}/seasons`)
    .then((response) => response.data);
};

const getStandings = (): Promise<any> => {
  return httpClient
    .get(
      `unique-tournament/${croatianLeagueId}/season/${season2022Id}/standings/total`
    )
    .then((response) => response.data);
};

const getRounds = (): Promise<RoundsInterface> => {
  return httpClient
    .get(`unique-tournament/${croatianLeagueId}/season/${season2022Id}/rounds`)
    .then((response) => response.data);
};

const getFixturesByRound = (round: number): Promise<FixturesByRound> => {
  return httpClient
    .get(
      `unique-tournament/${croatianLeagueId}/season/${season2022Id}/events/round/${round}`
    )
    .then((response) => response.data);
};

const getFixture = (eventId: number): Promise<any> => {
  return httpClient.get(`event/${eventId}`).then((response) => response.data);
};

const getHajdukInfo = (): Promise<any> => {
  return httpClient.get(`/team/${hajdukId}`).then((response) => response.data);
};

const getHajdukPlayers = (): Promise<any> => {
  return httpClient
    .get(`/team/${hajdukId}/players`)
    .then((response) => response.data);
};

const getHajdukLogo = (): Promise<any> => {
  return httpClient
    .get(`team/${hajdukId}/image`)
    .then((response) => response.data);
};

export default {
  getLeagueData,
  getAllSeasons,
  getStandings,
  getRounds,
  getFixturesByRound,
  getFixture,
  getHajdukInfo,
  getHajdukPlayers,
  getHajdukLogo,
};
