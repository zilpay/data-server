import { Migration } from '@mikro-orm/migrations';

export class Migration20220214122335 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `token` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `bech32` text not null, `base16` text not null, `decimals` json not null default 1, `init_supply` text not null, `name` text not null, `symbol` text not null, `contract_owner` text null, `base_uri` text null, `type` integer not null);');
    this.addSql('create unique index `token_bech32_unique` on `token` (`bech32`);');
    this.addSql('create unique index `token_base16_unique` on `token` (`base16`);');
  }

}
