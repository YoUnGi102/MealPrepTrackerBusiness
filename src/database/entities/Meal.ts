import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MealIngredient } from "./MealIngredient";
import { Fridge } from "./Fridge";
import { MacroEntity } from "./MacroEntity";
import { Macros } from "src/logic/types";

@Entity()
export class Meal extends MacroEntity {

  @ManyToOne(() => Fridge, fridge => fridge.meals)
  fridge: Fridge;

  @OneToMany(() => MealIngredient, mi => mi.meal)
  ingredients: MealIngredient[];

  @Column("int")
  portions: number;

  constructor(portions: number, ingredients: MealIngredient[], createdBy: User, fridge?: Fridge){
    if(ingredients){
      const macros: Macros = ingredients.reduce((acc: Macros, mi: MealIngredient) => {
          return {
            calories: acc.calories + mi.ingredient.calories,
            protein: acc.protein + mi.ingredient.protein,
            carbs: acc.carbs + mi.ingredient.carbs,
            sugar: acc.sugar + mi.ingredient.sugar,
            fat: acc.fat + mi.ingredient.fat,
          };
        },
        { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0 }
      );
      super(macros.protein, macros.carbs, macros.fat, macros.sugar, macros.calories, createdBy)
    }
    else {
      super(0,0,0,0,0, createdBy);
    }
    this.portions = portions;
    this.ingredients = ingredients;
    this.fridge = fridge || createdBy?.fridge;
  }

}