import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ChatroomsService } from 'src/chatrooms/chatrooms.service';

import { User } from 'src/users/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private usersService: UsersService,
    private chatroomsService: ChatroomsService,
  ) {}

  async getOne(msgId: string): Promise<Message> {
    return this.messageRepository.findOneBy({ id: msgId });
  }

  async createMessage(room: string, user: string, text: string) {
    const msg = new Message();
    msg.sender = await this.usersService.findOne(user);
    msg.room = await this.chatroomsService.findOne(room);
    msg.text = text;
    this.messageRepository.insert(msg);
  }

  async updateMessage(msgId: string, newText: string, username: string) {
    const msg = await this.getMsgAndVerify(msgId, username);
    msg.text = newText;
    this.messageRepository.save(msg);
  }

  async deleteUser(user: User) {
    this.messageRepository.delete({ sender: user });
  }

  async deleteMessage(msgId: string, username: string) {
    await this.getMsgAndVerify(msgId, username);
    this.messageRepository.delete({ id: msgId });
  }

  private async getMsgAndVerify(
    msgId: string,
    username: string,
  ): Promise<Message> {
    const msg = await this.getOne(msgId);

    if (msg.sender.username !== username) {
      throw new HttpException(
        "cannot delete another user's messages",
        HttpStatus.FORBIDDEN,
      );
    }

    return msg;
  }
}
