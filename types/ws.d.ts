import type { TxBlockType, TxHashes } from './block';

export interface WSResponse {
  TxBlock: TxBlockType;
  TxHashes: TxHashes;
}
