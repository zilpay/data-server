import {
  Entity,
  Enum,
  PrimaryKey,
  Property,
  Unique
} from '@mikro-orm/core';
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
  @Unique()
  bech32!: string;

  @Property()
  @Unique()
  base16!: string;

  @Property({ default: 1 })
  decimals = 1;

  @Property({ columnType: 'bigserial', type: 'number' })
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
}
