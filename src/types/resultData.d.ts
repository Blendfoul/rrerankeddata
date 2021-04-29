export interface MpRaceResult {
  GetMpRaceResultResult: {
    TrackId: {
      Id: number;
      Name: string;
    };
    QualiResult: QualiResult[];
    RaceHash: string;
    TrackLayoutId: {
      Id: number;
      Name: string;
    };
    RaceResult: RaceResult[];
  };
}

export interface QualiResult {
  Username: string;
  FinishPositionInClass: number;
  FinishPosition: number;
  StartPosition: number;
  Laps: Lap[];
  UserId: number;
  CarClass: {
    Id: number;
    Name: string;
  };
  Incidents: Incident[];
  Team: string;
  FullName: string;
  LiveryId: {
    Id: number;
    Name: string;
  };
  PerformanceIndex: number;
}

export interface RaceResult {
  Username: string;
  FinishPositionInClass: number;
  FinishPosition: number;
  RatingBefore: number;
  StartPosition: number;
  Laps: Lap[];
  UserId: number;
  ReputationAfter: number;
  StartPositionInClass: number;
  CarClass: {
    Id: number;
    Name: string;
  };
  RatingChange: number;
  Incidents: Incident[];
  Starter: boolean;
  Team: string;
  RatingAfter: number;
  FullName: string;
  ReputationBefore: number;
  LiveryId: {
    Id: number;
    Name: string;
  };
  PerformanceIndex: number;
  ReputationChange: number;
}

export interface Lap {
  Position: number;
  SectorTimes: number[];
  Valid: boolean;
  PositionInClass: number;
  Time: number;
}

export interface Incident {
  Count: number;
  Points: number;
  Type: string;
}
