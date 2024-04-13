import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Invite } from 'src/invites/invite.entity';
import { Chatroom } from 'src/chatrooms/chatroom.entity';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Chatroom)
  joinedRooms: Chatroom[];

  @OneToMany(() => Chatroom, (room) => room.owner)
  ownedRooms: Chatroom[];

  @OneToMany(() => Invite, (invite) => invite.user)
  pendingInvites: Invite[];
}
