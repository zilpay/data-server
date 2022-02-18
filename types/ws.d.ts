import type { TxBlock, TxHashes } from './block';

export interface WSResponse {
  TxBlock: TxBlock;
  TxHashes: TxHashes;
}
