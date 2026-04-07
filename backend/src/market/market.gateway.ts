import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MarketService } from './market.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MarketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private marketService: MarketService) {}

  handleConnection() {
    console.log('前端連線');
  }

  handleDisconnect() {
    console.log('前端斷線');
  }

  broadcastPrice(data: any) {
    this.server.emit('price', data);
  }
}
