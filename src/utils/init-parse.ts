import type { ScillaParam } from "types/rpc";

import { TokenTypes } from '../config/token-types';

export function findParam(init: ScillaParam[], vname: string) {
  return init.find((param) => param.vname === vname)?.value;
}

export function initParser(init: ScillaParam[]) {
  let type = TokenTypes.ZRC2;
  const symbol = findParam(init, 'symbol');
  const name = findParam(init, 'name');
  let decimals = Number(findParam(init, 'decimals'));
  const initSupply = BigInt(findParam(init, 'init_supply') || 0);
  const contractOwner = findParam(init, 'initial_contract_owner') || findParam(init, 'contract_owner');
  const baseUri = findParam(init, 'initial_base_uri') || findParam(init, 'base_uri');

  if (typeof symbol === 'undefined') {
    throw new Error('symbol is required param');
  }

  if (typeof name === 'undefined') {
    throw new Error('name is required param');
  }

  if (isNaN(decimals)) {
    type = TokenTypes.ZRC1;
    decimals = 1;
  }

  return {
    type,
    name,
    symbol,
    decimals,
    initSupply,
    contractOwner,
    baseUri
  };
}
