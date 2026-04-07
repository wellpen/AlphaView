import { Injectable, OnModuleInit } from '@nestjs/common';
import WebSocket from 'ws';
import { MarketGateway } from './market.gateway';

const SYMBOLS = ['AAPL', 'TSLA', 'NVDA'];

@Injectable()
export class MarketService implements OnModuleInit {
  private ws!: WebSocket;
  private gateway!: MarketGateway;

  setGateway(gateway: MarketGateway) {
    this.gateway = gateway;
  }

  onModuleInit() {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`,
    );

    this.ws.on('open', () => {
      console.log('Finnhub 連線成功');
      SYMBOLS.forEach((symbol) => {
        this.ws.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      const msg = JSON.parse(Buffer.from(data as Buffer).toString()) as {
        type: string;
        data: { s: string; p: number; t: number }[];
      };
      if (msg.type === 'trade' && this.gateway) {
        msg.data.forEach((trade) => {
          this.gateway.broadcastPrice({
            symbol: trade.s,
            price: trade.p,
            time: trade.t,
          });
        });
      }
    });

    this.ws.on('close', () => {
      console.log('Finnhub 斷線，5秒後重連');
      setTimeout(() => this.connect(), 5000);
    });
  }
}
