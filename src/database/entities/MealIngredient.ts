import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "./AuditableEntity";
import { Ingredient } from "./Ingredient";
import { Meal } from "./Meal";
import { User } from "./User";

@Entity()
export class MealIngredient extends AuditableEntity {

  @ManyToOne(() => Meal, meal => meal.ingredients)
  meal: Meal;

  @ManyToOne(() => Ingredient, ing => ing.mealIngredients)
  ingredient: Ingredient;

  @Column("float")
  quantity: number; // grams

  constructor(meal: Meal, ingredient: Ingredient, quantity: number, createdBy?: User){
    super(createdBy);
    this.quantity = quantity;
    this.ingredient = ingredient;
    this.meal = meal;
  }

}