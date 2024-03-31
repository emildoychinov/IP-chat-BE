import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.owned_rooms)
  owner: User;

  @ManyToMany(() => User)
  members: User[];
}
