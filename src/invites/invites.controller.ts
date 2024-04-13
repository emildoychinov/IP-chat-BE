import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { AuthUser } from 'src/auth/auth.decorator';

export class InviteDto {
  username: string;
  roomName: string;
}

export class InviteOptionDto {
  inviteId: string;
}

@Controller('invite')
export class InvitesController {
  constructor(private invitesService: InvitesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  invite(@Body() dto: InviteDto, @AuthUser() user: string) {
    this.invitesService.invite(user, dto.username, dto.roomName);
  }

  @HttpCode(HttpStatus.OK)
  @Post('accept')
  accept(@Body() dto: InviteOptionDto, @AuthUser() user: string) {
    this.invitesService.accept(dto.inviteId, user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('decline')
  decline(@Body() dto: InviteOptionDto, @AuthUser() user: string) {
    this.invitesService.decline(dto.inviteId, user);
  }
}
