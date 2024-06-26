import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './auth.decorator';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';
import { ApiTags } from '@nestjs/swagger';

export class AuthDto {
  @IsNotEmpty()
  @MinLength(2, { message: 'usernames must be at least 2 symbols' })
  @IsAlphanumeric(null, {
    message: 'usernames must be alphanumeric',
  })
  username: string;
  @IsNotEmpty()
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto.username, dto.password);
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto.username, dto.password);
  }
}
