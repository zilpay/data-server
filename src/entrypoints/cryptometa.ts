import fetch from 'cross-fetch';

export const CRYPTO_META_URL = 'https://raw.githubusercontent.com/Ashlar/cryptometa/master/src/full.json';

export async function getMeta(): Promise<string[]> {
  const res = await fetch(CRYPTO_META_URL);
  const result = await res.json();
  const keys = Object
    .keys(result)
    .filter((key) => key.includes('zilliqa.'))
    .map((key) => key.replace('zilliqa.', ''));
  return keys;
}
