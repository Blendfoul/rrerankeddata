export interface GenericIdData {
  Id: number;
  Name: string;
}

export interface Result {
  RaceHash: string;
  StartPosition: number;
  PlayersCount: number;
  TrackLayoutId: GenericIdData;
  Cars: {
    Id: number;
    Name: string;
  }[];
  PerformanceIndexes: number[];
  IncidentPoints: number;
  ReputationAfter: number;
  StartPositionInClass: number;
  RatingChange: number;
  RatingAfter: number;
  Starter: boolean;
  RaceFinishTime: number;
  FinishPositionInClass: number;
  ReputationChange: number;
  RatingBefore: number;
  RaceNum: number;
  CarClasses: {
    Id: number;
    Name: string;
  }[];
  FinishPosition: number;
  NonStartersCount: number;
  CorrelationId: string;
  LiveryId: {
    Id: number;
    Name: string;
  };
  ReputationBefore: number;
  PerformanceIndex: number;
}
