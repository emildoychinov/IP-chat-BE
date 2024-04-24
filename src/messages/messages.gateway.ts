import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Inject, forwardRef } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth.decorator';

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
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private messagesService: MessagesService,
  ) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    socket: Socket,
    dto: sendMessageDto,
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

    socket.to(dto.roomName).emit('receiveMessage', {
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
  async joinChatrooms(socket: Socket, username: string) {
    let user = await this.usersService.getSelf(username);
    for (const room of user.joinedRooms) {
      socket.join(room.name);
    }
    for (const room of user.ownedRooms) {
      socket.join(room.name);
    }
  }
}
