import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth.decorator';
import { UsersService } from './users.service';
import { User } from './user.entity';

export class UpdatePassDto {
  newPassword: string;
}

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /* used mainly to get the user's `joined_rooms` and `pending_invites` */
  @HttpCode(HttpStatus.OK)
  @Get('self')
  async getSelf(@AuthUser() username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update_password')
  updatePassword(@Body() dto: UpdatePassDto, @AuthUser() username: string) {
    this.usersService.changePassword(username, dto.newPassword);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  deleteUser(@AuthUser() username: string) {
    this.usersService.deleteUser(username);
  }
}
