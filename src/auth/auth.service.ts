import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

export interface JwtResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<JwtResponse> {
    const user = await this.usersService.findOne(username);
    const isValidPass = await bcrypt.compare(password, user?.password || '');

    if (!isValidPass) {
      throw new UnauthorizedException();
    }

    return this.buildJwt(user.username);
  }

  async signUp(username: string, password: string): Promise<JwtResponse> {
    const user = await this.usersService.findOne(username);
    if (user != null) {
      throw new HttpException('user already exists', 409);
    }

    this.usersService.createUser(username, password);

    return this.buildJwt(username);
  }

  private async buildJwt(username: String): Promise<JwtResponse> {
    const payload = { user: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
