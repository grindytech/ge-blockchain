import { Status } from "./types";

export type GEStatistic<T> = {
  status: Status;
  data?: T[];
  error?: string;
};
