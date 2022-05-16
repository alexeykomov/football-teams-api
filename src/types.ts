export interface ErrorPayload {
  errorCode: number;
  message: string;
}

export interface TeamShortResponsePayload {
  teams: TeamShort[];
}

export type TeamFullResponsePayload = TeamFull;

export interface MatchResponsePayload {
  matches: Match[];
}

interface Area {
  id: number;
  name: string;
}

export interface TeamShort {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}

export interface TeamFull extends TeamShort {
  squad: SquadMember[];
}

export interface SquadMember {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  countryOfBirth: string;
  nationality: string;
  role: string;
}

export interface Match {
  id: number;
  competition: {
    id: number;
    name: string;
  };
  utcDate: string;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
}
