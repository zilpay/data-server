import fetch from 'cross-fetch';

export const CRYPTO_META_URL = 'https://raw.githubusercontent.com/Ashlar/cryptometa/master/src/full.json';

export async function getMeta(): Promise<string[]> {
  const res = await fetch(CRYPTO_META_URL);
  const result = await res.json();
  const chain = 'zilliqa.';
  const keys = Object
    .keys(result)
    .filter((key) => key.includes(chain))
    .map((key) => key.replace(chain, ''));
  return keys;
}
