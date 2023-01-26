import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway(8081,{
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', message);
  }
}
