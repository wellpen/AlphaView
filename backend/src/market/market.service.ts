import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WebSocket from 'ws';
import { MarketGateway } from './market.gateway';
import axios from 'axios';

const SYMBOLS = [
  'AAPL',
  'TSLA',
  'NVDA',
  'MSFT',
  'GOOGL',
  'AMZN',
  'TSM',
  'META',
];

interface FinnhubTrade {
  s: string;
  p: number;
  t: number;
}

interface FinnhubMessage {
  type: string;
  data: FinnhubTrade[];
}

interface FinnhubQuote {
  c: number; // 當前價格
  d: number; // 漲跌金額
  dp: number; // 漲跌幅 %
  pc: number; // 昨天收盤價
}

@Injectable()
export class MarketService implements OnModuleInit {
  private ws!: WebSocket;

  constructor(
    private readonly gateway: MarketGateway,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    this.connect();
  }

  private connect() {
    const apiKey = this.config.get<string>('FINNHUB_API_KEY');
    if (!apiKey) {
      console.error('錯誤: 找不到 FINNHUB_API_KEY');
      return;
    }

    this.ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    this.ws.on('open', () => {
      console.log('✅ Finnhub 連線成功');
      SYMBOLS.forEach((symbol) => {
        this.ws.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const msg = JSON.parse(data.toString()) as FinnhubMessage;
        if (msg.type === 'trade' && msg.data) {
          msg.data.forEach((trade: FinnhubTrade) => {
            const payload = {
              symbol: trade.s,
              price: trade.p,
              time: trade.t,
            };

            this.gateway.broadcastPrice(payload);
            console.log(`📊 廣播股價: ${trade.s} -> ${trade.p}`);
          });
        }
      } catch (error) {
        console.error('解析 Finnhub 訊息失敗:', error);
      }
    });

    this.ws.on('error', (err) => {
      console.error('❌ WebSocket 錯誤:', err.message);
    });

    this.ws.on('close', () => {
      console.warn('⚠️ Finnhub 斷線，5秒後重連...');
      setTimeout(() => this.connect(), 5000);
    });
  }

  async getQuotes(symbols: string[]) {
    const apiKey = this.config.get<string>('FINNHUB_API_KEY');
    const baseUrl = this.config.get<string>('FINNHUB_BASE_URL');

    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const { data } = await axios.get<FinnhubQuote>(`${baseUrl}/quote`, {
          params: { symbol, token: apiKey },
        });
        return {
          symbol,
          price: data.c,
          change: data.dp,
          prevClose: data.pc,
          changeAmount: data.d,
        };
      }),
    );

    return results;
  }
}
