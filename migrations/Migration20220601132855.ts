import { Migration } from '@mikro-orm/migrations';

export class Migration20220601132855 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `token` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `bech32` text not null, `base16` text not null, `decimals` integer not null default 1, `init_supply` text not null, `name` text not null, `symbol` text not null, `contract_owner` text null, `base_uri` text null, `scope` integer not null, `listed` integer not null, `type` integer not null, `status` integer not null);');

    this.addSql('create table `rate` (`id` integer not null primary key autoincrement, `usd` text not null, `jpy` text not null, `cny` text not null, `chf` text not null, `cad` text not null, `mxn` text not null, `inr` text not null, `brl` text not null, `rub` text not null, `krw` text not null, `idr` text not null, `try` text not null, `sar` text not null, `sek` text not null, `ngn` text not null, `pln` text not null, `ars` text not null, `nok` text not null, `twd` text not null, `aed` text not null, `thb` text not null, `zar` text not null, `dkk` text not null, `myr` text not null, `sgd` text not null, `ils` text not null, `hkd` text not null, `php` text not null, `clp` text not null, `pkr` text not null, `czk` text not null, `vnd` text not null, `bdt` text not null, `huf` text not null, `uah` text not null, `lkr` text not null, `mmk` text not null, `bhd` text not null, `btc` text not null, `xrp` text not null, `aud` text not null, `gbp` text not null, `eth` text not null, `eur` text not null, `ltc` text not null, `nzd` text not null);');

    this.addSql('create table `block` (`id` integer not null primary key autoincrement, `block_num` integer not null, `gas_limit` integer not null, `gas_used` integer not null, `mb_info_hash` text not null, `miner_pub_key` text not null, `num_micro_blocks` integer not null, `num_pages` integer not null, `num_txns` integer not null, `prev_block_hash` text not null, `rewards` text not null, `state_delta_hash` text not null, `state_root_hash` text not null, `timestamp` integer not null, `txn_fees` text not null, `version` integer not null, `block_hash` text not null, `header_sign` text not null);');
  }

}
