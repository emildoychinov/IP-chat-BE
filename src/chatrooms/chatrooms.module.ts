import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatroomsService } from './chatrooms.service';
import { ChatroomsController } from './chatrooms.controller';

import { Chatroom } from './entities/chatroom.entity';
import { Invite } from './entities/invite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chatroom, Invite])],
  providers: [ChatroomsService],
  controllers: [ChatroomsController],
})
export class ChatroomsModule {}
