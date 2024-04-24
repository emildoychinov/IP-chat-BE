import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import { ChatroomsService } from './chatrooms.service';
import { AuthUser } from 'src/auth/auth.decorator';
import { Message } from 'src/messages/message.entity';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chatrooms')
@Controller('chatroom')
export class ChatroomsController {
  constructor(private chatroomsService: ChatroomsService) {}

  @HttpCode(HttpStatus.OK)
  @Post(':roomName/create')
  async createRoom(
    @Param('roomName') roomName: string,
    @AuthUser() username: string,
  ) {
    return this.chatroomsService.createRoom(roomName, username);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':roomName/messages')
  async getMessages(
    @Param('roomName') roomName: string,
    @AuthUser() username: string,
  ): Promise<Message[]> {
    return this.chatroomsService.messages(roomName, username);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':roomName')
  deleteRoom(
    @Param('roomName') roomName: string,
    @AuthUser() username: string,
  ) {
    this.chatroomsService.deleteRoom(roomName, username);
  }
}
