import fetch from 'cross-fetch';

export const CRYPTO_META_URL = 'https://raw.githubusercontent.com/Ashlar/cryptometa/master/src/full.json';

const exceptions = [
  ['zil1cuf78e3p37utekgk0gtcvd3hvkrqcgt06lrnty', 'zil1n02sfv2ytldc7jnyx3f7c9zehwdzlxy2ykrhf9'],
  ['zil180v66mlw007ltdv8tq5t240y7upwgf7djklmwh', 'zil1zu72vac254htqpg3mtywdcfm84l3dfd9qzww8t']
];

export async function getMeta(): Promise<string[]> {
  const res = await fetch(CRYPTO_META_URL);
  const result = await res.json();
  const chain = 'zilliqa.';
  const keys = Object
    .keys(result)
    .filter((key) => key.includes(chain))
    .map((key) => {
      const bech32 = key.replace(chain, '');
      const found = exceptions.find((e) => e[0] === bech32);

      if (found) {
        return found[1];
      }

      return bech32;
    });
  return keys;
}
