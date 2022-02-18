export interface MicroBlockInfosType {
  MicroBlockHash: string;
  MicroBlockShardId: number;
  MicroBlockTxnRootHash: string;
}

export interface TxBlockBody {
  BlockHash: string;
  HeaderSign: string;
  MicroBlockInfos: MicroBlockInfosType[];
}

export interface TxBlockHeader {
  BlockNum: string;
  DSBlockNum: string;
  GasLimit: string;
  GasUsed: string;
  MbInfoHash: string;
  MinerPubKey: string;
  NumMicroBlocks: number;
  NumPages: number;
  NumTxns: number
  PrevBlockHash: string;
  Rewards: string;
  StateDeltaHash: string;
  StateRootHash: string;
  Timestamp: string;
  TxnFees: string;
  Version: number;
}

export interface TxBlockType {
  body: TxBlockBody;
  header: TxBlockHeader;
}

export type TxHashes = Array<string[]>;

export interface DSBlockType {
  header: {
    BlockNum: string;
    Difficulty: number;
    DifficultyDS: number;
    GasPrice: string;
    LeaderPubKey: string;
    PoWWinners: string[];
    PrevHash: string;
    Timestamp: string;
  };
  signature: string;
}