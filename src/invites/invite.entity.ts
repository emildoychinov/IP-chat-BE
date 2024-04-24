import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  username: string;
  roomName: string;
}
