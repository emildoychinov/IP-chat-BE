import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Invite } from 'src/invites/invite.entity';
import { Chatroom } from 'src/chatrooms/chatroom.entity';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Chatroom)
  @JoinTable()
  joinedRooms: Chatroom[];

  @OneToMany(() => Chatroom, (room) => room.owner)
  @JoinTable()
  ownedRooms: Chatroom[];

  @OneToMany(() => Invite, (invite) => invite.user)
  @JoinTable()
  pendingInvites: Invite[];
}
