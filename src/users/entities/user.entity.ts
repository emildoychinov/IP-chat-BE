import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Invite } from 'src/chatrooms/entities/invite.entity';
import { Chatroom } from 'src/chatrooms/entities/chatroom.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Chatroom)
  joined_rooms: Chatroom[];

  @OneToMany(() => Chatroom, (room) => room.owner)
  owned_rooms: Chatroom[];

  @OneToMany(() => Invite, (invite) => invite.user)
  pending_invites: Invite[];
}
