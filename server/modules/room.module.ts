import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from 'server/controllers/room.controller';
import { Room } from 'server/entities/room.entity';
import { MessageGateway } from 'server/providers/gateways/message.gateway';
import { JwtService } from 'server/providers/services/jwt.service';
import { RoomService } from 'server/providers/services/room.service';
import { GuardUtil } from 'server/providers/util/guard.util';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService, JwtService, MessageGateway, GuardUtil],
  exports: [TypeOrmModule],
})
export class RoomModule {}
