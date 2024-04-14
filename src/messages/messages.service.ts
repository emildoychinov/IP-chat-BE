import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getOne(msgId: string): Promise<Message> {
    return this.messageRepository.findOneBy({ id: msgId });
  }

  async createMessage(
    room: string,
    user: string,
    text: string,
    timestamp: number,
  ): Promise<InsertResult> {
    const msg = new Message();
    msg.sender = user;
    msg.roomName = room;
    msg.text = text;
    msg.timestamp = timestamp;
    return this.messageRepository.insert(msg);
  }

  async updateMessage(msgId: string, newText: string, username: string) {
    const msg = await this.getMsgAndVerify(msgId, username);
    msg.text = newText;
    this.messageRepository.save(msg);
  }

  async deleteMessage(msgId: string, username: string) {
    await this.getMsgAndVerify(msgId, username);
    this.messageRepository.delete({ id: msgId });
  }

  /* removes all messages from  the given  chatroom*/
  async deleteChatroomMessages(roomName: string) {
    await this.messageRepository
      .createQueryBuilder()
      .delete()
      .where('name = :roomName', { roomName: roomName })
      .execute();
  }

  private async getMsgAndVerify(
    msgId: string,
    username: string,
  ): Promise<Message> {
    const msg = await this.getOne(msgId);

    if (msg.sender !== username) {
      throw new HttpException(
        "cannot delete another user's messages",
        HttpStatus.FORBIDDEN,
      );
    }

    return msg;
  }
}
