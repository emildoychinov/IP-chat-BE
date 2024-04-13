import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatroomsService } from './chatrooms.service';
import { AuthUser } from 'src/auth/auth.decorator';
import { Message } from 'src/messages/message.entity';

@Controller('chatroom')
export class ChatroomsController {
  constructor(private chatroomsService: ChatroomsService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':room/messages')
  async getMessages(
    @Param('room') roomName: string,
    @AuthUser() username: string,
  ): Promise<Message[]> {
    return this.chatroomsService.messages(roomName, username);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':room')
  deleteRoom(@Param('room') roomName: string, @AuthUser() username: string) {
    this.chatroomsService.deleteRoom(roomName, username);
  }
}
