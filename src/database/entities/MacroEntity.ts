import { Column, Entity } from "typeorm";
import { AuditableEntity } from "./AuditableEntity";
import { User } from "./User";

@Entity()
export abstract class MacroEntity extends AuditableEntity {
    @Column("float")
    protein: number;
  
    @Column("float")
    carbs: number;

    @Column("float")
    sugar: number;
  
    @Column("float")
    fat: number;
  
    @Column("float")
    calories: number;

    constructor(protein: number, carbs: number, fat: number, sugar: number, calories: number, createdBy?: User,){
        super(createdBy)
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.sugar = sugar;
        this.calories = calories;
    }
}