import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface FinnhubSymbol {
  symbol: string;
  description: string;
}

@Injectable()
export class StockService implements OnModuleInit {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    await this.loadStockList();
  }

  async loadStockList() {
    const apiKey = this.config.get<string>('FINNHUB_API_KEY');
    const baseUrl = this.config.get<string>('FINNHUB_BASE_URL');

    const { data } = await axios.get<FinnhubSymbol[]>(
      `${baseUrl}/stock/symbol`,
      { params: { exchange: 'US', token: apiKey } },
    );

    await this.stockRepository.upsert(
      data.map((item) => ({ symbol: item.symbol, name: item.description })),
      ['symbol'],
    );

    console.log(`✅ 股票清單同步完成，共 ${data.length} 筆`);
  }

  async getStockList(): Promise<Stock[]> {
    return this.stockRepository.find();
  }
}
