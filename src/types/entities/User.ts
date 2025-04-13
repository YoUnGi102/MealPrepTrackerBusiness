import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude() // Ensure proper import of @Exclude decorator
  password: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  constructor(username: string, password: string, active: boolean = true) {
    this.username = username;
    this.password = password;
    this.active = active;
  }
}
