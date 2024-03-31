import {
  IsAlphanumeric,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2, { message: 'usernames must be at least 2 symbols' })
  @IsAlphanumeric(null, {
    message: 'usernames must be alphanumeric',
  })
  username: string;

  @IsNotEmpty()
  password: string;
}
