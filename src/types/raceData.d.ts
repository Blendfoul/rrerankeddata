export interface RaceData {
  RaceInfos: RaceInfo;
  Quali: QualiData[];
  Race: Race[];
}

interface Incident {
  Type: string;
  Count: number;
}

export interface QualiData {
  Avatar: string;
  Username: string;
  FullName: string;
  Team: string;
  FinishPosition: number;
  Livery: string;
  Incidents: number;
  ValidLaps: number;
  BestTime: string;
  FastestSector: number[];
  BestSectorsTimes: number[];
  IncidentsDetails: Incident[];
}

export interface LapData {
  Position: number;
  PositionInClass: number;
  SectorTimes: number[];
  Time: number;
  Valid: boolean;
}

export interface Race {
  Avatar: string;
  Username: string;
  FullName: string;
  Team: string;
  StartPosition: number;
  FinishPosition: number;
  DiffPosition: number;
  Livery: string;
  BestTime: string;
  WorstTime: string;
  DiffTime: string;
  AvgTime: string;
  RatingChange: number;
  ReputationChange: number;
  Laps: LapData[];
  FastestSector: number[];
  BestSectorsTimes: number[];
  Incidents: number;
  IncidentsDetails: {Type: string; Count: number}[];
}

export interface RaceInfo {
  PositionsGainedOverall: number;
  Drivers: number;
  RatingOverall: number;
  ReputationOverall: number;
  ReputationAverage: number;
  IncidentsOverall: number;
  IncidentsAverage: number;
  BestLaptimeOverallMillisecounds: number;
  BestLaptimeOverallText: string;
  AvgDiffFastestLapMillisecounds: string;
  AvgDiffFastestLapText: number;
  AvgLaptimeOverallMillisecounds: number;
  AvgLaptimeOverallText: string;
  MaxDiffFastestLapMillisecounds: number;
  MaxDiffFastestLapText: string;
  RatingAverage: number;
}
