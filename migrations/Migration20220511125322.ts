import { Migration } from '@mikro-orm/migrations';

export class Migration20220511125322 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `token` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `bech32` text not null, `base16` text not null, `decimals` json not null default 1, `init_supply` text not null, `name` text not null, `symbol` text not null, `contract_owner` text null, `base_uri` text null, `scope` json not null, `listed` json not null, `type` integer not null, `status` integer not null);');

    this.addSql('create table `rate` (`id` integer not null primary key autoincrement, `usd` integer not null, `jpy` integer not null, `cny` integer not null, `chf` integer not null, `cad` integer not null, `mxn` integer not null, `inr` integer not null, `brl` integer not null, `rub` integer not null, `krw` integer not null, `idr` integer not null, `try` integer not null, `sar` integer not null, `sek` integer not null, `ngn` integer not null, `pln` integer not null, `ars` integer not null, `nok` integer not null, `twd` integer not null, `aed` integer not null, `thb` integer not null, `zar` integer not null, `dkk` integer not null, `myr` integer not null, `sgd` integer not null, `ils` integer not null, `hkd` integer not null, `php` integer not null, `clp` integer not null, `pkr` integer not null, `czk` integer not null, `vnd` integer not null, `bdt` integer not null, `huf` integer not null, `uah` integer not null, `lkr` integer not null, `mmk` integer not null, `bhd` integer not null, `btc` integer not null, `xrp` integer not null, `aud` integer not null, `gbp` integer not null, `eth` integer not null, `eur` integer not null, `ltc` integer not null, `nzd` integer not null);');

    this.addSql('create table `block` (`id` integer not null primary key autoincrement, `block_num` integer not null, `gas_limit` integer not null, `gas_used` integer not null, `mb_info_hash` text not null, `miner_pub_key` text not null, `num_micro_blocks` integer not null, `num_pages` integer not null, `num_txns` integer not null, `prev_block_hash` text not null, `rewards` text not null, `state_delta_hash` text not null, `state_root_hash` text not null, `timestamp` integer not null, `txn_fees` text not null, `version` integer not null, `block_hash` text not null, `header_sign` text not null);');
  }

}
