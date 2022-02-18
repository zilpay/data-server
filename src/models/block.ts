import {
  Entity,
  PrimaryKey,
  Property
} from '@mikro-orm/core';
import { TxBlockType } from 'types/block';

@Entity()
export class Block {
  @PrimaryKey()
  id!: number;

  @Property()
  blockNum!: number;

  @Property()
  gasLimit!: number;

  @Property()
  gasUsed!: number;

  @Property()
  mbInfoHash!: string;

  @Property()
  minerPubKey!: string;

  @Property()
  numMicroBlocks!: number;

  @Property()
  numPages!: number;

  @Property()
  numTxns!: number;

  @Property()
  prevBlockHash!: string;

  @Property()
  rewards!: string;

  @Property()
  stateDeltaHash!: string;

  @Property()
  stateRootHash!: string;

  @Property()
  timestamp!: number;

  @Property()
  txnFees!: string;

  @Property()
  version!: number;

  @Property()
  blockHash!: string;

  @Property()
  headerSign!: string;

  constructor(data: TxBlockType) {
    this.blockNum = Number(data.header.BlockNum);
    this.gasLimit = Number(data.header.GasLimit);
    this.gasUsed = Number(data.header.GasUsed);
    this.mbInfoHash = data.header.MbInfoHash;
    this.minerPubKey = data.header.MinerPubKey;
    this.numMicroBlocks = data.header.NumMicroBlocks;
    this.numPages = data.header.NumPages;
    this.numTxns = data.header.NumTxns;
    this.prevBlockHash = data.header.PrevBlockHash;
    this.rewards = data.header.Rewards;
    this.stateDeltaHash = data.header.StateDeltaHash;
    this.stateRootHash = data.header.StateRootHash;
    this.timestamp = Number(data.header.Timestamp);
    this.txnFees = data.header.TxnFees;
    this.version = data.header.Version;
    this.blockHash = data.body.BlockHash;
    this.headerSign = data.body.HeaderSign;
  }
}
