import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Inject, forwardRef } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth.decorator';

import { UsersService } from 'src/users/users.service';
import { MessagesService } from './messages.service';

class sendMessageDto {
  roomName: string;
  text: string;
}

class sendMessageResponse {
  msgId: string;
  timestamp: number;
}

@WebSocketGateway(3001)
export class MessagesGateway {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private messagesService: MessagesService,
  ) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    socket: Socket,
    @AuthUser() username: string,
    dto: sendMessageDto,
  ): Promise<sendMessageResponse> {
    let timestamp = Date.now() / 1000;
    let msgId = (
      await this.messagesService.createMessage(
        dto.roomName,
        dto.text,
        username,
        timestamp,
      )
    ).raw.insertId;

    socket.to(dto.roomName).emit('receiveMessage', {
      msgId: msgId,
      user: username,
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
  async joinChatrooms(socket: Socket, @AuthUser() username: string) {
    let user = await this.usersService.getSelf(username);
    for (const room of user.joinedRooms) {
      socket.join(room.name);
    }
    for (const room of user.ownedRooms) {
      socket.join(room.name);
    }
  }
}
