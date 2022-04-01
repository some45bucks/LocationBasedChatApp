import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Room } from 'server/entities/room.entity';
import { RoomService } from 'server/providers/services/room.service';
import * as crypto from 'crypto';

class RoomBody {
  name: string;
}

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/rooms')
  async index() {
    const rooms = await this.roomService.findAll();
    return { rooms };
  }

  @Get('/rooms/:id')
  async show(@Param('id') id: string) {
    const room = await this.roomService.findOne(parseInt(id, 10));
    return { room };
  }

  @Get('/rooms/key/:key')
  async findByKey(@Param('key') key: string) {
    const room = await this.roomService.findByKey(key);
    return { room };
  }

  @Post('/rooms')
  async create(@Body() body: RoomBody) {
    let room = new Room();
    room.name = body.name;
    room.roomkey = crypto.randomBytes(8).toString('hex');
    room = await this.roomService.create(room);
    return { room };
  }
}
