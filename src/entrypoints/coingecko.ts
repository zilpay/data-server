import fetch from 'cross-fetch';

export interface CoinGeckoResponse {
  zilliqa: {
    [currency: string]: number;
  }
}

export async function getZILRate(currencies: string[]): Promise<CoinGeckoResponse> {
  const params = `?ids=zilliqa&vs_currencies=${currencies.join(',')}`;
  const url = `https://api.coingecko.com/api/v3/simple/price${params}`;
  const res = await fetch(url);
  return res.json();
}
