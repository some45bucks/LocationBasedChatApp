import { UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from '../guards/gatewayauth.guard';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { JwtService } from '../services/jwt.service';
import { Server, Socket } from 'socket.io';

class JoinPayload {
  currentRoomKey?: string;
  newRoomKey: string;
}

class MessagePayLoad {
  public message: string;
  public userId: number;
  public userName: string;
}

@WebSocketGateway()
@UseGuards(GatewayAuthGuard)
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: any, ...args: any[]) {
    try {
      const jwt = client.handshake.auth.token;
      const jwtBody = this.jwtService.parseToken(jwt);
      console.log(client.handshake.query);
      console.log('Client Connected: ', jwtBody.userId);
    } catch (e) {
      throw new WsException('Invalid token');
    }
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('join-room')
  public async joinRoom(client: Socket, payload: JoinPayload) {
    console.log(payload);

    payload.currentRoomKey && (await client.leave(payload.currentRoomKey));

    await client.join(payload.newRoomKey);
    
    const res = { msg: 'Joined room', newRoomKey: payload.newRoomKey };

    console.log(res);

    return res;
  }
}
