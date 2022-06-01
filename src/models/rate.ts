import type { RateObject } from 'types/rate';
import {
  Entity,
  PrimaryKey,
  Property
} from '@mikro-orm/core';

@Entity()
export class Rate {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'flaot' })
  usd!: number;

  @Property({ type: 'flaot' })
  jpy!: number;

  @Property({ type: 'flaot' })
  cny!: number;

  @Property({ type: 'flaot' })
  chf!: number;

  @Property({ type: 'flaot' })
  cad!: number;

  @Property({ type: 'flaot' })
  mxn!: number;

  @Property({ type: 'flaot' })
  inr!: number;

  @Property({ type: 'flaot' })
  brl!: number;

  @Property({ type: 'flaot' })
  rub!: number;

  @Property({ type: 'flaot' })
  krw!: number;

  @Property({ type: 'flaot' })
  idr!: number;
  
  @Property({ type: 'flaot' })
  try!: number;

  @Property({ type: 'flaot' })
  sar!: number;

  @Property({ type: 'flaot' })
  sek!: number;

  @Property({ type: 'flaot' })
  ngn!: number;

  @Property({ type: 'flaot' })
  pln!: number;

  @Property({ type: 'flaot' })
  ars!: number;

  @Property({ type: 'flaot' })
  nok!: number;

  @Property({ type: 'flaot' })
  twd!: number;

  @Property({ type: 'flaot' })
  aed!: number;

  @Property({ type: 'flaot' })
  thb!: number;

  @Property({ type: 'flaot' })
  zar!: number;

  @Property({ type: 'flaot' })
  dkk!: number;

  @Property({ type: 'flaot' })
  myr!: number;

  @Property({ type: 'flaot' })
  sgd!: number;

  @Property({ type: 'flaot' })
  ils!: number;

  @Property({ type: 'flaot' })
  hkd!: number;

  @Property({ type: 'flaot' })
  php!: number;

  @Property({ type: 'flaot' })
  clp!: number;

  @Property({ type: 'flaot' })
  pkr!: number;
  
  @Property({ type: 'flaot' })
  czk!: number;

  @Property({ type: 'flaot' })
  vnd!: number;

  @Property({ type: 'flaot' })
  bdt!: number;

  @Property({ type: 'flaot' })
  huf!: number;

  @Property({ type: 'flaot' })
  uah!: number;

  @Property({ type: 'flaot' })
  lkr!: number;

  @Property({ type: 'flaot' })
  mmk!: number;

  @Property({ type: 'flaot' })
  bhd!: number;

  @Property({ type: 'flaot' })
  btc!: number;

  @Property({ type: 'flaot' })
  xrp!: number;

  @Property({ type: 'flaot' })
  aud!: number;

  @Property({ type: 'flaot' })
  gbp!: number;

  @Property({ type: 'flaot' })
  eth!: number;

  @Property({ type: 'flaot' })
  eur!: number;

  @Property({ type: 'flaot' })
  ltc!: number;

  @Property({ type: 'flaot' })
  nzd!: number;

  constructor(data: RateObject) {
    this.usd = data.usd;
    this.jpy = data.jpy;
    this.cny = data.cny;
    this.chf = data.chf;
    this.cad = data.cad;
    this.mxn = data.mxn;
    this.inr = data.inr;
    this.brl = data.brl;
    this.rub = data.rub;
    this.krw = data.krw;
    this.idr = data.idr;
    this.try = data.try;
    this.sar = data.sar;
    this.sek = data.sek;
    this.ngn = data.ngn;
    this.pln = data.pln;
    this.ars = data.ars;
    this.nok = data.nok;
    this.twd = data.twd;
    this.aed = data.aed;
    this.thb = data.thb;
    this.zar = data.zar;
    this.dkk = data.dkk;
    this.myr = data.myr;
    this.sgd = data.sgd;
    this.ils = data.ils;
    this.hkd = data.hkd;
    this.php = data.php;
    this.clp = data.clp;
    this.pkr = data.pkr;
    this.czk = data.czk;
    this.vnd = data.vnd;
    this.bdt = data.bdt;
    this.huf = data.huf;
    this.uah = data.uah;
    this.lkr = data.lkr;
    this.mmk = data.mmk;
    this.bhd = data.bhd;
    this.btc = data.btc;
    this.xrp = data.xrp;
    this.aud = data.aud;
    this.gbp = data.gbp;
    this.eth = data.eth;
    this.eur = data.eur;
    this.ltc = data.ltc;
    this.nzd = data.nzd;
  }
}
