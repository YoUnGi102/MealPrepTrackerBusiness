import { Entity, OneToMany } from 'typeorm';
import { User } from './User';
import { Meal } from './Meal';
import { AuditableEntity } from './AuditableEntity';

@Entity()
export class Fridge extends AuditableEntity {
  @OneToMany(() => User, (user) => user.fridge)
  users: User[];

  @OneToMany(() => Meal, (meal) => meal.fridge, { cascade: true })
  meals?: Meal[];

  constructor(users: User[], createdBy: User) {
    super(createdBy);
    this.users = users;
  }
}
