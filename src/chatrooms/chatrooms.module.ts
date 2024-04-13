import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatroomsService } from './chatrooms.service';
import { ChatroomsController } from './chatrooms.controller';

import { Chatroom } from './chatroom.entity';
import { UsersModule } from 'src/users/users.module';

import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chatroom]),
    forwardRef(() => UsersModule),
  ],
  providers: [ChatroomsService],
  exports: [ChatroomsService, TypeOrmModule],
  controllers: [ChatroomsController],
})
export class ChatroomsModule {}
