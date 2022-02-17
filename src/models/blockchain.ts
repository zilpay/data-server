import {
  Entity,
  PrimaryKey,
  Property
} from '@mikro-orm/core';

@Entity()
export class Blockchain {

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  numDSBlocks!: string;

  @Property()
  numTxBlocks!: string;
}
