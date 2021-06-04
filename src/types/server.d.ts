export interface ServerInterface {
  Ping: number;
  Server: ServerData;
}

export interface ServerData {
  ServerIp: string;
  Port: number;
  PortTimeCritical: number;
  CurrentSession: number;
  TimeLeft: number;
  PlayersOnServer: number;
  Players: number[];
  Settings: ServerDataSettings;
}

export interface ServerDataSettings {
  Thumbnail: string;
  ServerName: string;
  HasPassword: boolean;
  ExperienceId: number;
  TrackLayoutId: number[];
  LiveryId: number[];
  Difficulty: number;
  MaxNumberOfPlayers: number;
  FuelUsage: number;
  TireWear: number;
  MechanicalDamage: number;
  FlagRules: number;
  QualifyDuration: number;
  RaceDuration: number;
  CutRules: number;
  MandatoryPitStop: boolean;
  DriveAssist: {
    Preset: number;
    Transmission: number;
    Esp: number;
    SteerAssist: number;
    BrakeAssist: number;
    TractionControl: number;
  };
  Id: number;
  IsRanked: boolean;
  PracticeDuration: number;
  QualifyStartMode: number;
  Race1Duration: number;
  Race2Duration: number;
  Race3Duration: number;
  ReverseGridPlaces: number;
  MinRating: number;
  MinReputation: number;
}
