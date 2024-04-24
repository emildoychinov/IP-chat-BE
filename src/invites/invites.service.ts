import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invite } from './invite.entity';
import { UsersService } from 'src/users/users.service';
import { ChatroomsService } from 'src/chatrooms/chatrooms.service';
import { User } from 'src/users/user.entity';

import { Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class InvitesService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private chatroomsService: ChatroomsService,
    @InjectRepository(Invite)
    private inviteRepository: Repository<Invite>,
  ) {}

  async accept(inviteId: string, username: string) {
    const invite = await this.getAndVerifyInvite(inviteId, username);

    this.inviteRepository.delete({ id: inviteId });
    this.usersService.joinRoom(invite.user, invite.chatroom);
  }

  async decline(inviteId: string, username: string) {
    /* this makes sure the user has permissions to interact with the invite */
    await this.getAndVerifyInvite(inviteId, username);

    await this.inviteRepository.delete({ id: inviteId });
  }

  async invite(from: string, username: string, roomName: string) {
    const sender = await this.usersService.getSelf(from);

    const validRoom = sender.ownedRooms.some((room) => room.name === roomName);
    if (!validRoom) {
      throw new HttpException(
        'only room owners can invite',
        HttpStatus.BAD_REQUEST,
      );
    }

    const receiver = await this.usersService.findOne(username);
    if (!receiver) {
      throw new HttpException(
        'invalid invite receiver',
        HttpStatus.BAD_REQUEST,
      );
    }

    const invite = new Invite();
    invite.user = receiver;
    invite.chatroom = await this.chatroomsService.findOne(roomName);

    this.inviteRepository.save(invite);
  }

  async deleteUserInvites(user: User) {
    this.inviteRepository.remove(user.pendingInvites);
  }

  private async getAndVerifyInvite(
    inviteId: string,
    username: string,
  ): Promise<Invite> {
    const invite = await this.inviteRepository.findOneBy({ id: inviteId });

    if (invite.user.username != username) {
      throw new HttpException(
        'no permission to interact with this invite',
        HttpStatus.FORBIDDEN,
      );
    }

    return invite;
  }
}
