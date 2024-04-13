import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Chatroom } from 'src/chatrooms/chatroom.entity';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.pendingInvites)
  user: User;

  @ManyToMany(() => Chatroom)
  chatroom: Chatroom;
}
