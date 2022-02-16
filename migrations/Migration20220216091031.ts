import { Migration } from '@mikro-orm/migrations';

export class Migration20220216091031 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `token` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `bech32` text not null, `base16` text not null, `decimals` json not null default 1, `init_supply` text not null, `name` text not null, `symbol` text not null, `contract_owner` text null, `base_uri` text null, `scope` json not null, `type` integer not null, `status` integer not null);');

    this.addSql('create table `rate` (`id` integer not null primary key autoincrement, `jpy` integer not null, `cny` integer not null, `chf` integer not null, `cad` integer not null, `mxn` integer not null, `inr` integer not null, `brl` integer not null, `rub` integer not null, `krw` integer not null, `idr` integer not null, `try` integer not null, `sar` integer not null, `sek` integer not null, `ngn` integer not null, `pln` integer not null, `ars` integer not null, `nok` integer not null, `twd` integer not null, `irr` integer not null, `aed` integer not null, `cop` integer not null, `thb` integer not null, `zar` integer not null, `dkk` integer not null, `myr` integer not null, `sgd` integer not null, `ils` integer not null, `hkd` integer not null, `egp` integer not null, `php` integer not null, `clp` integer not null, `pkr` integer not null, `iqd` integer not null, `dzd` integer not null, `kzt` integer not null, `qar` integer not null, `czk` integer not null, `pen` integer not null, `ron` integer not null, `vnd` integer not null, `bdt` integer not null, `huf` integer not null, `uah` integer not null, `aoa` integer not null, `mad` integer not null, `omr` integer not null, `cuc` integer not null, `byr` integer not null, `azn` integer not null, `lkr` integer not null, `sdg` integer not null, `syp` integer not null, `mmk` integer not null, `dop` integer not null, `uzs` integer not null, `kes` integer not null, `gtq` integer not null, `ury` integer not null, `hrv` integer not null, `mop` integer not null, `etb` integer not null, `crc` integer not null, `tzs` integer not null, `tmt` integer not null, `tnd` integer not null, `pab` integer not null, `lbp` integer not null, `rsd` integer not null, `lyd` integer not null, `ghs` integer not null, `yer` integer not null, `bob` integer not null, `bhd` integer not null, `cdf` integer not null, `pyg` integer not null, `ugx` integer not null, `svc` integer not null, `ttd` integer not null, `afn` integer not null, `npr` integer not null, `hnl` integer not null, `bih` integer not null, `bnd` integer not null, `isk` integer not null, `khr` integer not null, `gel` integer not null, `mzn` integer not null, `bwp` integer not null, `pgk` integer not null, `jmd` integer not null, `xaf` integer not null, `nad` integer not null, `all` integer not null, `ssp` integer not null, `mur` integer not null, `mnt` integer not null, `nio` integer not null, `lak` integer not null, `mkd` integer not null, `amd` integer not null, `mga` integer not null, `xpf` integer not null, `tjs` integer not null, `htg` integer not null, `bsd` integer not null, `mdl` integer not null, `rwf` integer not null, `kgs` integer not null, `gnf` integer not null, `srd` integer not null, `sll` integer not null, `xof` integer not null, `mwk` integer not null, `fjd` integer not null, `ern` integer not null, `szl` integer not null, `gyd` integer not null, `bif` integer not null, `kyd` integer not null, `mvr` integer not null, `lsl` integer not null, `lrd` integer not null, `cve` integer not null, `djf` integer not null, `scr` integer not null, `sos` integer not null, `gmd` integer not null, `kmf` integer not null, `std` integer not null, `btc` integer not null, `xrp` integer not null, `aud` integer not null, `bgn` integer not null, `jod` integer not null, `gbp` integer not null, `eth` integer not null, `eur` integer not null, `ltc` integer not null, `nzd` integer not null);');
  }

}
