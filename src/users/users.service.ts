import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = new User();
    user.username = dto.username;
    user.password = dto.password;
    user.joined_rooms = [];
    user.owned_rooms = [];
    user.pending_invites = [];
    this.userRepository.insert(user);
  }

  /* returns `null` if no user is found */
  async findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username: username });
  }
}
