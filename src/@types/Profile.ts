export interface Profile {
  avatar: string;
  header: string;
  name: string;
  online: boolean;
  username: string;
  raceList: {
    GetUserMpRatingProgressResult: {
      TotalEntries: number;
      Entries: Race[];
    };
  };
  overview: {
    basic_statistics: {value: string}[];
    country: {
      code: string;
      name: string;
    };
    most_used_cars: {
      image: {
        scaled: string;
      };
    }[];
    most_used_tracks: {
      image: {
        full: string;
      };
    }[];
  };
  simbiner: boolean;
  isBroadcaster: boolean;
  vip: boolean;
  team: string;
  user_id: number;
}

export interface Race {
  CarClasses: Car[];
  Cars: Car[];
  CorrelationId: string;
  FinishPosition: number;
  FinishPositionInClass: number;
  IncidentPoints: number;
  LiveryId: Car;
  NonStartersCount: number;
  PerformanceIndex: number;
  PerformanceIndexes: number[];
  PlayersCount: number;
  RaceFinishTime: number;
  RaceHash: string;
  RaceNum: number;
  RatingAfter: number;
  RatingBefore: number;
  RatingChange: number;
  ReputationAfter: number;
  ReputationBefore: number;
  ReputationChange: number;
  StartPosition: number;
  StartPositionInClass: number;
  Starter: string;
  TrackLayoutId: Track;
}

export interface Car {
  Id: number;
  Name: string;
}

export interface Track {
  Id: number;
  Name: string;
  Layouts: Layout[];
}

interface Layout {
  Name: string;
  Track: number;
  MaxnumberOfVehicles: number;
  Id: number;
}
