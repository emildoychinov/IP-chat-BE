import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Chatroom } from './chatroom.entity';
import { UsersService } from 'src/users/users.service';
import { Message } from 'src/messages/message.entity';
import { User } from 'src/users/user.entity';

import { Inject, forwardRef } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class ChatroomsService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @InjectRepository(Chatroom)
    private chatroomRepository: Repository<Chatroom>,
    private messagesService: MessagesService,
  ) {}

  async findOne(roomName: string): Promise<Chatroom> {
    return this.chatroomRepository.findOneBy({ name: roomName });
  }

  async createRoom(roomName: string, username: string) {
    const existingRoom = await this.findOne(roomName);
    if (existingRoom) {
      throw new HttpException('room already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.findOne(username);
    let room = new Chatroom();
    room.owner = user;
    room.members = [user];
    room.messages = [];
    room.name = roomName;
    this.chatroomRepository.insert(room);
  }

  async messages(roomName: string, username: string): Promise<Message[]> {
    const user = await this.usersService.findOne(username);

    const roomMember = user.joinedRooms.some((room) => room.name === roomName);
    if (!roomMember) {
      throw new HttpException(
        'only group members can view messages',
        HttpStatus.FORBIDDEN,
      );
    }

    const room = await this.chatroomRepository.findOneBy({ name: roomName });
    return room.messages;
  }

  async deleteRoom(roomName: string, username: string) {
    const room = await this.findOne(roomName);

    if (room.owner.username !== username) {
      throw new HttpException(
        'only owners can delete their rooms',
        HttpStatus.FORBIDDEN,
      );
    }

    this.messagesService.deleteChatroomMessages(roomName);
    this.chatroomRepository.delete(room);
  }

  async deleteUserRooms(user: User) {
    this.chatroomRepository.remove(user.ownedRooms);
  }
}
