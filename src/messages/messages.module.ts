import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { UsersModule } from 'src/users/users.module';
import { ChatroomsModule } from 'src/chatrooms/chatrooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule, ChatroomsModule],
  providers: [MessagesService],
  exports: [MessagesService, TypeOrmModule],
  controllers: [MessagesController],
})
export class MessagesModule {}
