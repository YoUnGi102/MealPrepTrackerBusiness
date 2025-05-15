import { Column, Entity, OneToMany } from 'typeorm';
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

  @Column('varchar', { length: 20, unique: true, nullable: true })
  barcode?: string;

  @Column('int', { nullable: true })
  defaultAmount?: number;

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
    barcode?: string,
    defaultAmount?: number,
  ) {
    super(name, type, protein, fat, carbs, sugar, calories, createdBy, image);
    this.barcode = barcode;
    this.defaultAmount = defaultAmount;
  }
}
