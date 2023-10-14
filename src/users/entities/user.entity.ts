import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ array: true })
  joined_rooms: string[];

  @Column({ array: true })
  owned_rooms: string[];

  @Column({ array: true })
  pending_invites: string[];
}
