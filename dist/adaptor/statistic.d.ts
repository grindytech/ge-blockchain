export interface GEStatisticAdaptor<TStatistic> {
    /**
     * return statistc data
     * @returns GEStatistic
     *
     */
    to_ge_market_data(): Promise<TStatistic[]>;
}
