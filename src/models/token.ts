import {
  Entity,
  Enum,
  PrimaryKey,
  Property
} from '@mikro-orm/core';
import { viewIcon } from 'src/lib/viewblock';
import { TokenTypes } from '../config/token-types';

@Entity()
export class Token {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  bech32!: string;

  @Property()
  base16!: string;

  @Property({ default: 1 })
  decimals = 1;

  @Property()
  initSupply!: string;

  @Property()
  name!: string;

  @Property()
  symbol!: string;

  @Property({ nullable: true })
  contractOwner?: string;

  @Property({ nullable: true })
  baseUri?: string;

  @Enum(() => TokenTypes)
  type!: TokenTypes;

  constructor(
    bech32: string,
    base16: string,
    name: string,
    symbol: string,
    type: TokenTypes,
    decimals = 1,
    initSupply = BigInt(1),
    contractOwner?: string,
    baseUri?: string
  ) {
    this.base16 = base16;
    this.bech32 = bech32;
    this.name = name;
    this.symbol = symbol;
    this.type = type;
    this.decimals = decimals;
    this.initSupply = String(initSupply);
    this.contractOwner = contractOwner;
    this.baseUri = baseUri;
  }
}
