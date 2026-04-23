import { Module } from '@nestjs/common';
import { MarketGateway } from './market.gateway';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';

@Module({
  controllers: [MarketController],
  providers: [MarketGateway, MarketService],
})
export class MarketModule {}
