
   
export interface RPCBody {
  id: number;
  jsonrpc: string;
  method: string;
  params: Params;
}
export type Params = TxParams[] | string[] | number[] | (string | string[] | number[])[];

export interface KeyValue {
  [key: string]: string;
}

export interface RPCResponse {
  id: number;
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    data: unknown;
    message: string;
  };
}

export interface ScillaParam {
  type: string;
  value: string;
  vname: string;
}

export interface AddressInit {
  [key: string]: ScillaParam[] | null;
};

export interface NFTState {
  [base16: string]: {
    url: string;
    id: string;
  }[];
}
