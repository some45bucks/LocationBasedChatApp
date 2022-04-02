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
import { GatewayJwtBody } from 'server/decorators/gateway_jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';

class currentRoomPayLoad {
  currentRoomKey: string;
}

class MessagePayLoad {
  public message: string;
  public userName: string;
  public roomKey: string;
  public time: string;
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
      client.join(client.handshake.query.roomKey as unknown as string);
      console.log('Client Connected: ', jwtBody.userId, client.handshake.query.roomKey);
    } catch (e) {
      throw new WsException('Invalid token');
    }
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('message')
  public async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessagePayLoad,
    @GatewayJwtBody() jwtBody: JwtBodyDto,
  ) {
    console.log('Message received: ', payload);

    this.server.to(payload.roomKey).emit('message', payload);
  }
}
