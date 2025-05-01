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

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;  

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => forwardRef(() => User), { nullable: true })
  createdBy?: User;
  
  @ManyToOne(() => forwardRef(() => User), { nullable: true })
  updatedBy?: User;
  
  @ManyToOne(() => forwardRef(() => User), { nullable: true })
  deletedBy?: User;

  @VersionColumn({default: 1})
  version: number;

  constructor(createdBy?: User) {
    this.createdBy = createdBy || undefined;
    this.version = 1
  }
}

function forwardRef(arg0: () => typeof User): import("typeorm").ObjectType<unknown> {
  throw new Error("Function not implemented.");
}
