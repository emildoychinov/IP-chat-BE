import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Message } from 'src/messages/message.entity';

@Entity()
export class Chatroom {
  @PrimaryColumn({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.ownedRooms)
  owner: User;

  @ManyToMany(() => User)
  members: User[];

  @OneToMany(() => Message, (msg) => msg.room)
  messages: Message[];
}
