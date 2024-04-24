import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Chatroom } from 'src/chatrooms/chatroom.entity';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.pendingInvites)
  @JoinTable()
  user: User;

  @ManyToMany(() => Chatroom)
  @JoinTable()
  chatroom: Chatroom;
}
