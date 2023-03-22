import { Height } from "../types";

export interface GEStatisticAdaptor<TStatistic> {
  /**
   * return statistc data
   * @param block - number of block
   * @returns GEStatistic
   *
   */
  to_ge_statistic(block: Height): Promise<TStatistic[]>;
}
