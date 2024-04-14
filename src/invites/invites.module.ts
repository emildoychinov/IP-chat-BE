import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';

import { Invite } from './invite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ChatroomsModule } from 'src/chatrooms/chatrooms.module';

import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invite]),
    forwardRef(() => ChatroomsModule),
    forwardRef(() => UsersModule),
  ],
  providers: [InvitesService],
  exports: [InvitesService, TypeOrmModule],
  controllers: [InvitesController],
})
export class InvitesModule {}
