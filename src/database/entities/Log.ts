import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Meal } from "./Meal";
import { User } from "./User";
import { MacroEntity } from "./MacroEntity";

@Entity()
export class Log extends MacroEntity {

  @ManyToOne(() => User, user => user.logs)
  user: User;

  @ManyToOne(() => Meal)
  meal: Meal;

  constructor(meal: Meal, createdBy: User){
    super(meal.protein, meal.carbs, meal.fat, meal.sugar, meal.calories, createdBy)
    this.user = createdBy;
    this.meal = meal;
  }

}
