import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class MarketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection() {
    console.log('前端連線');
  }

  handleDisconnect() {
    console.log('前端斷線');
  }

  broadcastPrice(data: any) {
    // console.log('正在廣播價格:', data); // 加這一行
    this.server.emit('price', data);
  }
}
