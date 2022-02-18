import { MikroORM, IDatabaseDriver, Connection } from '@mikro-orm/core';

import { TokenTypes } from '../config/token-types';
import { Token } from '../models/token';
import { NFTState } from '../models/nft-state';
import { initORM } from '../orm';
import { Zilliqa } from '../entrypoints/zilliqa';
import { TokenStatus } from '../config/token-status';

const chain = new Zilliqa();

(async function(){
  const orm = await initORM();

  async function updateState(tokens: Token[]) {
    for (const t of tokens) {
      try {
        t.balances.removeAll();
        const states = await chain.getNFTState(t.base16);
        const owners = Object.keys(states);
  
        for (const onwer of owners) {
          const list = states[onwer].map((s) => new NFTState(s.id, s.url, onwer));
          t.balances.add(...list);
        }
      } catch (err) {
        t.status = TokenStatus.Blocked;
      }
    }
  
    await orm.em.persistAndFlush(tokens);
  
    console.log(tokens.map((t) => t.symbol), 'updated');
  }
  
  async function update() {
    try {
      const list = await orm.em.getRepository(Token).find({
        type: TokenTypes.ZRC1,
        status: TokenStatus.Enabled,
        balances: null
      }, {
        limit: 10
      });
  
      await updateState(list);
    } catch (err) {
      console.error(err);
    }
  }


  await update();
}());
