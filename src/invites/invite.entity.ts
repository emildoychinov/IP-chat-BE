import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  roomName: string;
}
