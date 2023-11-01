export interface DataInterface {
    stats: StatsInterface;
    coins: CoinInterface[];
};

export interface StatsInterface {
    total:          number;
    totalCoins:     number;
    totalMarkets:   number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
};

export interface CoinInterface {
    uuid:           string;
    symbol:         string;
    name:           string;
    color:          string;
    iconUrl:        string;
    marketCap:      string;
    price:          string;
    listedAt:       number;
    tier:           number;
    change:         string;
    rank:           number;
    sparkline:      string[];
    lowVolume:      boolean;
    coinrankingUrl: string;
    "24hVolume":    string;
    btcPrice:       string;
};

export const initialStatsInterface: StatsInterface = {
    total: 0,
    totalCoins: 0,
    totalMarkets: 0,
    totalExchanges: 0,
    totalMarketCap: '',
    total24hVolume: '',
};