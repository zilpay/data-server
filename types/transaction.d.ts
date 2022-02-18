export interface TxParams {
  amount: string;
  code: string;
  data: string;
  gasLimit: string;
  gasPrice: string;
  nonce: number;
  priority: boolean;
  pubKey: string;
  signature?: string;
  toAddr: string;
  version?: number;
  from?: string;
  hash?: string;
}

export interface ScillaParam {
  type: string;
  value: string;
  vname: string;
}

export interface TransactionEvent {
  _eventname: string;
  address: string;
  params: ScillaParam[];
}

export interface ScillaTransitions {
  addr: string;
  depth: number;
  msg: {
    _amount: string;
    _recipient: string;
    _tag: string;
    params: ScillaParam[];
  }
}

export interface TransactionType {
  ID: string;
  amount: string;
  gasLimit: string;
  gasPrice: string;
  nonce: string;
  receipt: {
    cumulative_gas: string;
    epoch_num: string;
    success: boolean;
    event_logs?: TransactionEvent[];
    transitions?: ScillaTransitions[];
  },
  senderPubKey: string;
  signature: string;
  toAddr: string;
  version: string;
}
