import { Migration } from '@mikro-orm/migrations';

export class Migration20220601124003 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE TABLE `_knex_temp_alter257` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, `bech32` text NOT NULL, `base16` text NOT NULL, `decimals` integer NOT NULL, `init_supply` text NOT NULL, `name` text NOT NULL, `symbol` text NOT NULL, `contract_owner` text NULL, `base_uri` text NULL, `scope` integer NOT NULL, `listed` integer NOT NULL, `type` integer NOT NULL, `status` integer NOT NULL);');
    this.addSql('INSERT INTO "_knex_temp_alter257" SELECT * FROM "token";;');
    this.addSql('DROP TABLE "token";');
    this.addSql('ALTER TABLE "_knex_temp_alter257" RENAME TO "token";');
  }

}
