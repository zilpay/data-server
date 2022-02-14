import fetch from 'cross-fetch';

export interface CurrencyResponse {
  query: {
    apikey: string;
    timestamp: number;
    base_currency: string;
  };
  data: {
    [symbol: string]: number;
  }
}

export const CURRENCY_URL = `https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.CURRENCY_API}`;

export async function getCurrencyRate(): Promise<CurrencyResponse> {
  const res = await fetch(CURRENCY_URL);
  return res.json();
}
