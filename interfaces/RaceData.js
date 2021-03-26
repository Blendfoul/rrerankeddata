export interface RaceData {
  RaceInfos: RaceInfo;
  Quali: QualiData[];
  Race: Race[];
}

export interface QualiData {
  Avatar: String;
  Username: String;
  FullName: String;
  Team: String;
  FinishPosition: Number;
  Livery: String;
  Incidents: Number;
  ValidLaps: Number;
  BestTime: String;
}

export interface Race {
  Avatar: String;
  Username: String;
  FullName: String;
  Team: String;
  StartPosition: Number;
  FinishPosition: Number;
  DiffPosition: Number;
  Livery: String;
  BestTime: String;
  WorstTime: String;
  DiffTime: String;
  AvgTime: String;
  RatingChange: Number;
  ReputationChange: Number;
}

export interface RaceInfo {
  PositionsGainedOverall: Number;
  Drivers: Number;
  RatingOverall: Number;
  ReputationOverall: Number;
  ReputationAverage: Number;
  IncidentsOverall: Number;
  IncidentsAverage: Number;
  BestLaptimeOverallMillisecounds: Number;
  BestLaptimeOverallText: String;
  AvgDiffFastestLapMillisecounds: String;
  AvgDiffFastestLapText: Number;
  AvgLaptimeOverallMillisecounds: Number;
  AvgLaptimeOverallText: String;
  MaxDiffFastestLapMillisecounds: Number;
  MaxDiffFastestLapText: String;
}
