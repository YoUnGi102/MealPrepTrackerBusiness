import { Entity, OneToMany } from 'typeorm';
import { User } from './User';
import { MacroEntity } from './MacroEntity';
import { MealIngredient } from './MealIngredient';

@Entity()
export class Ingredient extends MacroEntity {
  @OneToMany(
    () => MealIngredient,
    (mealIngredient) => mealIngredient.ingredient,
  )
  mealIngredients?: MealIngredient[];

  constructor(
    name: string,
    type: string,
    protein: number,
    fat: number,
    carbs: number,
    sugar: number,
    calories: number,
    image: string,
    createdBy: User,
  ) {
    super(name, type, protein, fat, carbs, sugar, calories, createdBy, image);
  }
}
