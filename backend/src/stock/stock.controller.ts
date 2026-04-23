import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { StockService } from './stock.service';

@Controller('stock')
@UseGuards(JwtGuard)
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  getStockList() {
    return this.stockService.getStockList();
  }
}
