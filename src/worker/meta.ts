import { Token } from '../models/token';
import { CryptoMetaResponse, getMeta } from '../entrypoints/cryptometa';
import { Zilliqa } from '../entrypoints/zilliqa';
import { initORM } from '../orm';

const chain = new Zilliqa();

async function meta() {
  const list: CryptoMetaResponse[] = [];
  try {
    const orm = await initORM();
    const bech32List = await getMeta();

    for (const meta of bech32List) {
      const token = await orm.em.findOne(Token, {
        bech32: meta.bech32
      });

      if (!token) {
        list.push(meta);
      }
    }

    const tokens = await chain.getInits(list);

    await orm.em.persistAndFlush(tokens);
  } catch (err) {
    console.error(err);
  }
}

meta();

setInterval(() => meta(), 1000000); /// 16.66666667 min
