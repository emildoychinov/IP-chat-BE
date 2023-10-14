import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    const res: User = new User();

    res.username = dto.username;
    res.password = dto.password;
    res.joined_rooms = [];
    res.owned_rooms = [];

    return this.userRepository.save(res);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(username: string) {
    return `This action returns a #${username} user`;
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneBy({ username });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
