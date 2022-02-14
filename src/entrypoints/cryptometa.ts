import fetch from 'cross-fetch';

export interface CryptoMetaResponse {
  bech32: string;
  score: number;
}

export const CRYPTO_META_URL = 'https://raw.githubusercontent.com/Ashlar/cryptometa/master/src/full.json';

const exceptions = [
  ['zil1cuf78e3p37utekgk0gtcvd3hvkrqcgt06lrnty', 'zil1n02sfv2ytldc7jnyx3f7c9zehwdzlxy2ykrhf9'],
  ['zil180v66mlw007ltdv8tq5t240y7upwgf7djklmwh', 'zil1zu72vac254htqpg3mtywdcfm84l3dfd9qzww8t']
];

export async function getMeta(): Promise<CryptoMetaResponse[]> {
  const res = await fetch(CRYPTO_META_URL);
  const result = await res.json();
  const chain = 'zilliqa.';
  const keys = Object
    .keys(result)
    .filter((key) => key.includes(chain))
    .map((key) => {
      const bech32 = key.replace(chain, '');
      const found = exceptions.find((e) => e[0] === bech32);
      const meta = result[chain + bech32];
      const score = Number(meta.gen && meta.gen.score || 0);

      if (found) {
        return {
          bech32: found[1],
          score
        };
      }

      return {
        bech32,
        score
      };
    });
  return keys;
}
