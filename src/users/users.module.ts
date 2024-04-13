import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';

import { ChatroomsModule } from 'src/chatrooms/chatrooms.module';
import { InvitesModule } from 'src/invites/invites.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ChatroomsModule, InvitesModule],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
