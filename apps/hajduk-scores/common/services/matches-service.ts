/* eslint-disable import/no-anonymous-default-export */
import httpClient from '../http/http-client';
import { RapidApiFixturesResponse } from '@hajduk-scores/api-interfaces';

const croatianLeagueId = 210;
export const hajdukId = 608;
// const uefaConferenceLeagueId = 848;

// const getCroatianLeagues = (): Promise<any> => {
//   return httpClient
//     .get(`leagues`, { params: { code: 'hr' } })
//     .then((response) => response.data);
// };
// const getHajdukData = (): Promise<any> => {
//   return httpClient
//     .get(`teams`, { params: { id: hajdukId } })
//     .then((response) => response.data);
// };
const getHajdukFixtures = (): Promise<RapidApiFixturesResponse> => {
  return httpClient
    .get('fixtures', {
      params: { season: 2022, team: hajdukId, league: croatianLeagueId },
    })
    .then((response) => response.data);
};
// const getLineupsForFixture = ({ fixtureNumber, teamId }): Promise<any> => {
//   return httpClient
//     .get('fixtures/lineups', {
//       params: { fixture: fixtureNumber, team: teamId },
//     })
//     .then((response) => response.data);
// };

export default {
  // getCroatianLeagues,
  // getHajdukData,
  getHajdukFixtures,
  // getLineupsForFixture,
};
