import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sender: String;

  @Column()
  roomName: String;

  @Column()
  text: string;

  @Column()
  timestamp: number;
}
