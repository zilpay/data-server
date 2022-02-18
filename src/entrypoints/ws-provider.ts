import type { WSResponse } from 'types/ws';

import { client as WebSocketClient, connection } from 'websocket';
import EventEmitter from 'events';

// const WS_PROVIDERS = 'wss://api-ws.zilliqa.com';

export enum WSMessageTypes {
  Connect = 'connect',
  Close = 'close',
  Message = 'message',
  Error = 'error',
  NewBlock = 'NewBlock',
  Unsubscribe = 'Unsubscribe',
  Notification = 'Notification'
}

export class WebSocketProvider extends EventEmitter {
  #client = new WebSocketClient();
  #connection?: connection;

  constructor(url: string) {
    super();

    this.#client.connect(url);

    this.#client.on(WSMessageTypes.Connect, (connection: connection) => {
      this.#connection = connection;
      connection.on(WSMessageTypes.Error, (error) => {
        this.emit(WSMessageTypes.Error, error);
        // console.log("Connection Error: " + error.toString());
      });
      connection.on(WSMessageTypes.Close, () => {
        this.emit(WSMessageTypes.Close);
        console.log('echo-protocol Connection Closed');
      });
      connection.on(WSMessageTypes.Message, (message): void => {
        if (message.type === 'utf8') {
          try {
            const data = JSON.parse(message.utf8Data);

            if (data.type === WSMessageTypes.Notification) {
              data.values.forEach((block: { value: WSResponse; }) => {
                this.emit(WSMessageTypes.NewBlock, block.value as WSResponse);
              });
            }
          } catch (err) {
            console.error(err);
          }
          // console.log("Received: '" + message.utf8Data + "'");
        }
      });
      connection.sendUTF(JSON.stringify({
        query: WSMessageTypes.NewBlock
      }));
    });
  }

  public unsubscribe() {
    if (this.#connection) {
      this.#connection.close();
    }
  }
}
