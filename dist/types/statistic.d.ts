import { Status } from "./types";
export type GEStatistic<T> = {
    status: Status;
    data?: T[];
    error?: string;
};
export type GESnapshot = {
    group: string;
    key: string;
    value: number;
    timestamp: number;
};
