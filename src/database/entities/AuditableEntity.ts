import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

export abstract class AuditableEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, { nullable: true })
  createdBy?: User; 

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;  

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, { nullable: true })
  deletedBy?: User;

  @VersionColumn({default: 1})
  version: number;

  constructor(createdBy?: User) {
    this.createdBy = createdBy || undefined;
    this.version = 1
  }
}