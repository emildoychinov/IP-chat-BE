import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Inject, forwardRef } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { MessagesService } from './messages.service';

class sendMessageDto {
  user: string;
  roomName: string;
  text: string;
}

class sendMessageResponse {
  msgId: string;
  timestamp: number;
}

@WebSocketGateway(3001)
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private messagesService: MessagesService,
  ) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() _socket: Socket,
    @MessageBody() dto: sendMessageDto,
  ): Promise<sendMessageResponse> {
    let timestamp = Math.round(Date.now() / 1000);
    let msgId = (
      await this.messagesService.createMessage(
        dto.roomName,
        dto.user,
        dto.text,
        timestamp,
      )
    ).raw.insertId;

    this.server.to(dto.roomName).emit('receiveMessage', {
      msgId: msgId,
      user: dto.user,
      roomName: dto.roomName,
      text: dto.text,
      timestamp: timestamp,
    });

    return {
      msgId: msgId,
      timestamp: timestamp,
    };
  }

  @SubscribeMessage('join')
  async joinChatrooms(@ConnectedSocket() socket: Socket, username: string) {
    let user = await this.usersService.getSelf(username);
    for (const room of user.joinedRooms) {
      socket.join(room.name);
    }
    for (const room of user.ownedRooms) {
      socket.join(room.name);
    }
  }
}
