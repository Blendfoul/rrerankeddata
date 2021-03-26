export interface Profile {
  avatar: String;
  header: String;
  name: String;
  online: Boolean;
  raceList: {
    GetUserMpRatingProgressResult: {
      TotalEntries: Number,
      Entries: Race[],
    },
  };
  simbiner: Boolean;
  isBroadcaster: Boolean;
  vip: Boolean;
  team: String;
  user_id: Number;
}

export interface Race {
  CarClasses: Car[];
  Cars: Car[];
  CorrelationId: String;
  FinishPosition: Number;
  FinishPositionInClass: Number;
  IncidentPoints: Number;
  LiveryId: Car;
  NonStartersCount: Number;
  PerformanceIndex: Number;
  PerformanceIndexes: Number[];
  PlayersCount: Number;
  RaceFinishTime: Number;
  RaceHash: String;
  RaceNum: Number;
  RatingAfter: Number;
  RatingBefore: Number;
  RatingChange: Number;
  ReputationAfter: Number;
  ReputationBefore: Number;
  ReputationChange: Number;
  StartPosition: Number;
  StartPositionInClass: Number;
  Starter: String;
  TrackLayoutId: Track;
}

export interface Car {
  Id: Number;
  Name: String;
}

export interface Track {
  Id: Number;
  Name: String;
}
