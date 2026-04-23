import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { MarketService } from './market.service';

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

@Controller('market')
@UseGuards(JwtGuard)
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('quote')
  async getQuotes() {
    return this.marketService.getQuotes(SYMBOLS);
  }
}
