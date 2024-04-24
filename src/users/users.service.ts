import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Chatroom } from 'src/chatrooms/chatroom.entity';
import { Invite } from 'src/invites/invite.entity';

import * as bcrypt from 'bcrypt';
import { ChatroomsService } from 'src/chatrooms/chatrooms.service';
import { InvitesService } from 'src/invites/invites.service';

const saltOrRounds = 15;

export class SelfDto {
  username: string;
  joinedRooms: Chatroom[];
  ownedRooms: Chatroom[];
  pendingInvites: Invite[];
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private chatroomsService: ChatroomsService,
    private invitesService: InvitesService,
  ) {}

  async createUser(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = await bcrypt.hash(password, saltOrRounds);
    user.joinedRooms = [];
    user.ownedRooms = [];
    user.pendingInvites = [];
    this.userRepository.insert(user);
  }

  /* returns `null` if no user is found */
  async findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username: username });
  }

  async getSelf(username: string): Promise<SelfDto> {
    let user = await this.userRepository.findOne({
      where: { username: username },
      relations: [
        'joinedRooms',
        'ownedRooms',
        'pendingInvites',
        'pendingInvites.user',
        'pendingInvites.chatroom',
      ],
    });

    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }

    return {
      username: username,
      joinedRooms: user.joinedRooms,
      ownedRooms: user.ownedRooms,
      pendingInvites: user.pendingInvites,
    };
  }

  joinRoom(user: User, room: Chatroom) {
    user.joinedRooms.push(room);
    this.userRepository.save(user);
  }

  async changePassword(username: string, password: string) {
    const user = await this.findOne(username);
    user.password = await bcrypt.hash(password, saltOrRounds);
    this.userRepository.save(user);
  }

  async deleteUser(username: string) {
    const user = await this.findOne(username);
    this.chatroomsService.deleteUserRooms(user);
    this.invitesService.deleteUserInvites(user);
    this.userRepository.delete(user);
  }
}
