type R3eData = {
  cars: Record<Car['Id'], Car>;
  classes: Record<CarClass['Id'], CarClass>;
  layouts: Record<Layout['Id'], Layout>;
  liveries: Record<Livery['Id'], Livery>;
  manufacturers: Record<Manufacturer['Id'], Manufacturer>;
  teams: Record<Team['Id'], Team>;
  tracks: Record<Track['Id'], Track>;
};

export type Car = {
  Id: number;
  DefaultLivery: number;
  class: number;
  CarManufacturer: number;
  BrandName: string;
  Name: string;
  Liveries: Livery[];
};

export type Livery = {
  Car: number;
  Class: number;
  Id: number;
  Name: string;
  Team: number;
  TeamName: string;
  Driver: Driver[];
};

type Driver = {
  Forename: string;
  Id: number;
  Surname: string;
};

export type CarClass = {
  Id: number;
  Name: string;
  Cars: { Id: number }[];
};

export type Manufacturer = {
  Id: number;
  Name: string;
};

export type Team = {
  Id: number;
  Name: string;
  Type: string;
};

export type Layout = {
  Id: number;
  MaxNumberOfVehicles: number;
  Name: string;
  Track: number;
};

export type Track = {
  Name: string;
  Id: number;
  layouts: Layout[];
};
