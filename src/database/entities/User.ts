import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AuditableEntityUUID } from './AuditableEntityUUID';
import { Fridge } from './Fridge';
import { Log } from './Log';

@Entity()
export class User extends AuditableEntityUUID {

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Fridge, fridge => fridge.users)
  fridge: Fridge;

  @OneToMany(() => Log, log => log.user)
  logs?: Log[];

  constructor(username: string, password: string, active: boolean = true, fridge: Fridge) {
    super();
    this.fridge = fridge;
    this.username = username;
    this.password = password;
    this.active = active;
  }
}
