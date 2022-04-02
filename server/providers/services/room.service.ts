import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'server/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOne(id: number): Promise<Room> {
    return this.roomRepository.findOne(id);
  }

  findByKey(key: string): Promise<Room> {
    return this.roomRepository.findOne({ where: { roomkey: key } });
  }

  create(room: Room): Promise<Room> {
    return this.roomRepository.save(room);
  }
}
