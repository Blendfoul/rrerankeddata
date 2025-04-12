import { R3eData } from "../data/General";

type GeneralState = {
  r3eData: R3eData;
  region: string;
  session: number;
  order: boolean;
  isLoading: boolean;
};

export type { GeneralState };
