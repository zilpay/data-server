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

  @Property()
  usd!: number;

  @Property()
  jpy!: number;

  @Property()
  cny!: number;

  @Property()
  chf!: number;

  @Property()
  cad!: number;

  @Property()
  mxn!: number;

  @Property()
  inr!: number;

  @Property()
  brl!: number;

  @Property()
  rub!: number;

  @Property()
  krw!: number;

  @Property()
  idr!: number;
  
  @Property()
  try!: number;

  @Property()
  sar!: number;

  @Property()
  sek!: number;

  @Property()
  ngn!: number;

  @Property()
  pln!: number;

  @Property()
  ars!: number;

  @Property()
  nok!: number;

  @Property()
  twd!: number;

  @Property()
  aed!: number;

  @Property()
  thb!: number;

  @Property()
  zar!: number;

  @Property()
  dkk!: number;

  @Property()
  myr!: number;

  @Property()
  sgd!: number;

  @Property()
  ils!: number;

  @Property()
  hkd!: number;

  @Property()
  php!: number;

  @Property()
  clp!: number;

  @Property()
  pkr!: number;
  
  @Property()
  czk!: number;

  @Property()
  vnd!: number;

  @Property()
  bdt!: number;

  @Property()
  huf!: number;

  @Property()
  uah!: number;

  @Property()
  lkr!: number;

  @Property()
  mmk!: number;

  @Property()
  bhd!: number;

  @Property()
  btc!: number;

  @Property()
  xrp!: number;

  @Property()
  aud!: number;

  @Property()
  gbp!: number;

  @Property()
  eth!: number;

  @Property()
  eur!: number;

  @Property()
  ltc!: number;

  @Property()
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
