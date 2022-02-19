import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property
} from '@mikro-orm/core';
import { Token } from './token';

@Entity()
export class NFTState {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid!: string;

  @Property()
  tokenId!: string;

  @Property()
  base16!: string;

  @Property({ nullable: true })
  url?: string;

  @Property({ type: 'json', nullable: true })
  meta?: object;

  @ManyToOne({
    entity: () => Token
  })
  nft!: Token;

  constructor(tokenId: string, url: string, base16: string, meta?: object) {
    this.tokenId = tokenId;
    this.url = url;
    this.base16 = base16;
    // this.nft = nft;
    this.meta = meta;
  }
}
