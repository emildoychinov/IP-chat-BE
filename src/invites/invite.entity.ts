import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Chatroom } from 'src/chatrooms/chatroom.entity';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.username)
  username: string;

  @ManyToOne(() => Chatroom, (room) => room.name)
  roomName: string;
}
