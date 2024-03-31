import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './auth.decorator';

class AuthDto {
  username: string;
  password: string;
}

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
