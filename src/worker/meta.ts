import bunyan from 'bunyan';

import { Token } from '../models/token';
import { getMeta } from '../entrypoints/cryptometa';
import { Zilliqa } from '../entrypoints/zilliqa';
import { initORM } from '../orm';

const log = bunyan.createLogger({
  name: "META_TASK"
});
const chain = new Zilliqa();

(async function() {
  const orm = await initORM();
  
  async function meta() {
    let list = await getMeta();
    const exists = await orm.em.getRepository(Token).find({
      bech32: list.map(({ bech32 }) => bech32)
    }, {
      fields: ['bech32']
    });
    list = list.filter(
      (t) => !exists.some((e) => e.bech32 === t.bech32)
    );

    log.info(`Found ${list.length} tokens to add.`);

    if (list.length === 0) {
      return;
    }

    const tokens = await chain.getInits(list);
    await orm.em.persistAndFlush(tokens);

    log.info(`Added ${tokens.length} tokens`);
  }

  meta();

  setInterval(() => meta(), 1000000); /// 16.66666667 min
}());
