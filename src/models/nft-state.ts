import {
  Embeddable,
  Embedded,
  Entity,
  PrimaryKey,
  Property
} from '@mikro-orm/core';

@Embeddable()
export class TokenState {
  @Property()
  id!: string;

  @Property({ nullable: true })
  metadata?: string;

  @Property()
  url!: string;
}

@Entity()
export class NFTState {
  @PrimaryKey()
  id!: number;

  @Property()
  base16!: string;

  @Embedded({ entity: () => TokenState, object: true })
  state!: TokenState;
}
