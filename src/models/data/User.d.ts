export type User = {
  name: string;
  country: {
    code: string;
    name: string;
  };
  header: string;
  avatar: string;
  id: number;
  team: string;
};

type MostUsed = {
  path: string;
  image: {
    scaled: string;
    full: string;
  };
  name: string;
};

export type RaceHistory = {
  TotalEntries: number;
  Entries: Result[];
};

export type Result = {
  RaceHash: string;
  StartPosition: number;
  PlayersCount: number;
  TrackLayoutId: {
    Id: number;
    Name: string;
  };
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
};

export type SearchUser = {
  name: string;
  image: string;
  meta_data: {
    slug: string;
  };
  type: string;
};
