import { Entity, ManyToOne } from 'typeorm';
import { Meal } from './Meal';
import { User } from './User';
import { AuditableEntity } from './AuditableEntity';

@Entity()
export class Log extends AuditableEntity {
  @ManyToOne(() => User, (user) => user.logs)
  user: User;

  @ManyToOne(() => Meal)
  meal: Meal;

  constructor(meal: Meal, createdBy: User) {
    super(createdBy);
    this.user = createdBy;
    this.meal = meal;
  }
}
