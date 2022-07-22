/* eslint-disable import/no-anonymous-default-export */
import httpClient from '../http/http-client';
import { League } from '@hajduk_scores/api-interfaces';

const croatianLeagueId = 170;
const season2022Id = 42138;
const hajdukId = 2036;

const getLeagueData = (): Promise<League> => {
  return httpClient
    .get<any>(`unique-tournament/${croatianLeagueId}`)
    .then((response) => response.data);
};

const getAllSeasons = (): Promise<any> => {
  return httpClient
    .get<any>(`unique-tournament/${croatianLeagueId}/seasons`)
    .then((response) => response);
};

const getStandings = (): Promise<any> => {
  return httpClient
    .get<any>(
      `unique-tournament/${croatianLeagueId}/season/${season2022Id}/standings/total`
    )
    .then((response) => response);
};

const getRounds = (): Promise<any> => {
  return httpClient
    .get<any>(
      `unique-tournament/${croatianLeagueId}/season/${season2022Id}/rounds`
    )
    .then((response) => response);
};

const getFixturesByRound = (round: number): Promise<any> => {
  return httpClient
    .get<any>(
      `unique-tournament/${croatianLeagueId}/season/${season2022Id}/events/round/${round}`
    )
    .then((response) => response);
};

const getFixture = (eventId: number): Promise<any> => {
  return httpClient.get<any>(`event/${eventId}`).then((response) => response);
};

const getHajdukInfo = (): Promise<any> => {
  return httpClient.get<any>(`/team/${hajdukId}`).then((response) => response);
};

const getHajdukPlayers = (): Promise<any> => {
  return httpClient
    .get<any>(`/team/${hajdukId}/players`)
    .then((response) => response);
};

const getHajdukLogo = (): Promise<any> => {
  return httpClient
    .get<any>(`team/${hajdukId}/image`)
    .then((response) => response);
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
