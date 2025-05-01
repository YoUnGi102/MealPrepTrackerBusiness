import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MealIngredient } from "./MealIngredient";
import { Fridge } from "./Fridge";
import { MacroEntity } from "./MacroEntity";
import { calculateMacros } from "../utils";

@Entity()
export class Meal extends MacroEntity {

  @ManyToOne(() => Fridge, fridge => fridge.meals)
  fridge: Fridge;

  @OneToMany(() => MealIngredient, mi => mi.meal)
  ingredients: MealIngredient[];

  @Column("int")
  portions: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculateMacros() {
    const {protein, fat, carbs, sugar, calories} = calculateMacros(this.ingredients)
    this.protein = protein;
    this.fat = fat;
    this.carbs = carbs;
    this.sugar = sugar;
    this.calories = calories;
  }

  constructor(name: string, type: string,  portions: number, ingredients: MealIngredient[], fridge: Fridge, createdBy: User, image?: string){
    const macros = calculateMacros(ingredients)
    super(name, type, macros.protein, macros.fat, macros.carbs, macros.sugar, macros.calories, createdBy, image)
    this.portions = portions;
    this.ingredients = ingredients;
    this.fridge = fridge;
  }

}