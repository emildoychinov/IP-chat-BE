import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { MessagesGateway } from './messages.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), forwardRef(() => UsersModule)],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService, TypeOrmModule],
  controllers: [MessagesController],
})
export class MessagesModule {}
