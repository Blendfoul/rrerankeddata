export interface Translations {
  navigation: {
    server: string;
    user: string;
    search: string;
    ranking: string;
    about: string;
    friends: string;
    settings: string;
    race: string;
    raceDetails: string;
    myDriver: string;
    sessionDetails: string;
    qualification: string;
    driverDetails: string;
    donate: string;
  };
  race: {
    cancel: string;
    all: string;
    regions: {
      name: string;
      value: string;
    }[];
  };
  raceDetails: {
    enabled: string;
    disabled: string;
    cutRules: string;
    general: string;
    drivers: string;
    layout: string;
    session: string;
    time: string;
    tireWear: string;
    fuel: string;
    mandatoryPit: string;
    players: string;
    sof: string;
    reputation: string;
    lowReputation: string;
  };
  user: {
    tutorial: {
      message_1: string;
      message_2: string;
      message_3: string;
    };
    message: string;
    search: string;
  };
  search: {
    placeholder: string;
    search: string;
    title: {
      search: string;
      details: string;
      sessionDetails: string;
    };
  };
  profile: {
    info: string;
    races: string;
    name: string;
    team: string;
    country: string;
    rating: string;
    reputation: string;
    track: string;
    car: string;
    privateer: string;
    lapsCompleted: string;
    laps: string;
    distance: string;
    timeInGame: string;
    joined: string;
  };
  session: {
    general: string;
    qualification: string;
    race: string;
    layout: string;
    drivers: string;
    positions: string;
    average: string;
    overall: string;
    fastest: string;
    averageLap: string;
    diffTimer: string;
    noTimeSet: string;
    UserResults: string;
    CarClass: string;
    LapsCompleted: string;
    StartPosition: string;
    FinishPosition: string;
    RatingAfter: string;
    ReputationAfter: string;
  };
  qualificationModal: {
    fastest: string;
    position: string;
    sector: string;
    optimal: string;
    incidents: string;
  };
  donation: {
    greeting: string;
    message: string;
  };
  raceModal: {
    name: string;
    team: string;
    bestLap: string;
    worstLap: string;
    averageLap: string;
    diff: string;
    start: string;
    finish: string;
    incidents: string;
    rating: string;
    reputation: string;
    optimalLap: string;
  };
  lapTable: {
    lap: string;
    sector1: string;
    sector2: string;
    sector3: string;
    valid: string;
    lapTime: string;
  };
  license: {
    disclaimer: string;
    mvp: string;
    license: string;
    somethingWrong: string;
  };
  sessions: {
    practice: string;
    qualification: string;
    race: string;
  };
  incidents: {
    invalidLap: string;
    losingControl: string;
    trackCollision: string;
    vehicleCollision: string;
    disconnect: string;
  };
  messages: {
    driverSet: string;
    copied: string;
  };
  loading: {
    drivers: string;
    start: string;
    servers: string;
    driver: string;
    session: string;
    server: string;
    history: string;
    friends: string;
    leaderboard: string;
    search: string;
    details: string;
  };
  rateModal: {
    title: string;
    paragraph: string;
    rate: string;
    later: string;
    never: string;
  };
  noConnection: string;
  noDrivers: string;
  exitApp: string;
  noServers: string;
  settings: {
    general: string;
    theme: string;
    language: string;
  };
}
