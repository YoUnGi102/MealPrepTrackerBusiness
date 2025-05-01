import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { MacroEntity } from './MacroEntity';
import { MealIngredient } from './MealIngredient';

@Entity()
export class Ingredient extends MacroEntity {

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: "Other" })
  type: string;

  @Column({ type: 'varchar', nullable: true})
  image: string;

  @OneToMany(() => MealIngredient, mealIngredient => mealIngredient.ingredient)
  mealIngredients?: MealIngredient[];

  constructor(
    name: string,
    type: string,
    protein: number,
    fat: number,
    carbs: number,
    sugar: number,
    image: string,
    calories: number,
    createdBy?: User
  ) {
    super(protein, carbs, fat, sugar, calories, createdBy)
    this.name = name;
    this.type = type;
    this.protein = protein;
    this.fat = fat;
    this.carbs = carbs;
    this.sugar = sugar;
    this.calories = calories;
    this.image = image;
  }
}
