import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Chatroom } from 'src/chatrooms/chatroom.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.username)
  sender: User;

  @ManyToOne(() => Chatroom, (room) => room.name)
  room: Chatroom;

  @Column()
  text: string;
}
