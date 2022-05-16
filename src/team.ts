import { AllowedCompetitions } from './constants';
import {
  ErrorPayload,
  Match,
  MatchResponsePayload,
  TeamFull,
  TeamFullResponsePayload,
  TeamShort,
  TeamShortResponsePayload,
} from './types';

const BASE_URL = 'https://api.football-data.org/v2/';
const AUTH_TOKEN = 'bf80f998e170471baa7e5f0cd3dfb640';

const produceErrorIfNeeded = (result: Record<string, unknown>) => {
  if ('errorCode' in result) {
    const err = result as unknown as ErrorPayload;
    throw new Error(`API error. ${err.message}`);
  }
};

export const loadAllTeams = async (competitionId: AllowedCompetitions): Promise<TeamShort[]> => {
  const response = await fetch(`${BASE_URL}competitions/${competitionId}/teams`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': AUTH_TOKEN,
    },
  });
  const result = await response.json();
  console.log('result: ', result);
  produceErrorIfNeeded(result);
  const validResult = result as TeamShortResponsePayload;
  return validResult.teams;
};

export const loadTeam = async (teamId: number): Promise<TeamFull> => {
  const response = await fetch(`${BASE_URL}teams/${teamId}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': AUTH_TOKEN,
    },
  });
  const result = await response.json();
  produceErrorIfNeeded(result);
  const validResult = result as TeamFullResponsePayload;
  return validResult;
};

const YEAR_IN_MILLIS = 31540000000;

export const loadMatches = async (teamId: number): Promise<Match[]> => {
  const now = new Date();
  const dateFrom = now.toISOString().slice(0, 10);
  const dateTo = new Date(now.getTime() + YEAR_IN_MILLIS).toISOString().slice(0, 10);
  const response = await fetch(`${BASE_URL}teams/${teamId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': AUTH_TOKEN,
    },
  });
  const result = await response.json();
  produceErrorIfNeeded(result);
  const validResult = result as MatchResponsePayload;
  return validResult.matches;
};
