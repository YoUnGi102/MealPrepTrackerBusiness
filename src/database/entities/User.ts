import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { AuditableEntity } from './AuditableEntity';
import { Fridge } from './Fridge';
import { Log } from './Log';

@Entity()
export class User extends AuditableEntity{

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Log, log => log.user)
  logs: Log[];

  @ManyToOne(() => Fridge, fridge => fridge.users, {nullable: true})
  fridge: Fridge;

  constructor(username: string, password: string, fridge: Fridge, active: boolean = true) {
    super();
    this.username = username;
    this.password = password;
    this.active = active;
    this.logs = [];
    this.fridge = fridge;
  }
}
