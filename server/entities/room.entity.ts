import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  roomkey: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;
}
