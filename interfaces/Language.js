export interface Language {
  navigation: {
    server: String,
    user: String,
    search: String,
    ranking: String,
    about: String,
  };
  race: {
    all: String,
    regions: String[],
  };
  raceDetails: {
    general: String,
    drivers: String,
    layout: String,
    session: String,
    time: String,
    tireWear: String,
    fuel: String,
    mandatoryPit: String,
    players: String,
    sof: String,
    reputation: String,
  };
  user: {
    bummer: String,
    message: String,
    search: String,
  };
  search: {
    placeholder: String,
    search: String,
    title: {
      search: String,
      details: String,
      sessionDetails: String,
    },
  };
  profile: {
    info: String,
    races: String,
    name: String,
    team: String,
    country: String,
    rating: String,
    reputation: String,
    track: String,
    car: String,
    privateer: String,
  };
  session: {
    general: String,
    qualification: String,
    race: String,
    layout: String,
    drivers: String,
    positions: String,
    average: String,
    overall: String,
    fastest: String,
    averageLap: String,
    diffTimer: String,
  };
  qualificationModal: {
    fastest: String,
    position: String,
    sector: String,
    optimal: String,
    incidents: String,
  };
  raceModal: {
    name: String,
    team: String,
    bestLap: String,
    worstLap: String,
    averageLap: String,
    diff: String,
    start: String,
    finish: String,
    incidents: String,
  };
  lapTable: {
    lap: String,
    sector1: String,
    sector2: String,
    sector3: String,
    valid: String,
    lapTime: String,
  };
  sessions: {
    practice: String,
    qualification: String,
    race: String,
  };
  incidents: {
    invalidLap: String,
    losingControl: String,
    trackCollision: String,
    vehicleCollision: String,
    disconnect: String,
  };
  messages: {
    driverSet: String,
  };
}
