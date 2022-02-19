import { Migration } from '@mikro-orm/migrations';

export class Migration20220219100351 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `token` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `bech32` text not null, `base16` text not null, `decimals` json not null default 1, `init_supply` text not null, `name` text not null, `symbol` text not null, `contract_owner` text null, `base_uri` text null, `scope` json not null, `type` integer not null, `status` integer not null);');

    this.addSql('create table `nftstate` (`id` integer not null primary key autoincrement, `token_id` text not null, `base16` text not null, `url` text null, `meta` json null, `nft_id` integer not null, constraint `nftstate_nft_id_foreign` foreign key(`nft_id`) references `token`(`id`) on update cascade);');
    this.addSql('create index `nftstate_nft_id_index` on `nftstate` (`nft_id`);');

    this.addSql('create table `block` (`id` integer not null primary key autoincrement, `block_num` integer not null, `gas_limit` integer not null, `gas_used` integer not null, `mb_info_hash` text not null, `miner_pub_key` text not null, `num_micro_blocks` integer not null, `num_pages` integer not null, `num_txns` integer not null, `prev_block_hash` text not null, `rewards` text not null, `state_delta_hash` text not null, `state_root_hash` text not null, `timestamp` integer not null, `txn_fees` text not null, `version` integer not null, `block_hash` text not null, `header_sign` text not null);');
  }

}
