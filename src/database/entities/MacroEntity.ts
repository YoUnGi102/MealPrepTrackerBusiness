import { Entity, Column } from 'typeorm';
import { User } from './User';
import { AuditableEntity } from './AuditableEntity';

@Entity()
export class MacroEntity extends AuditableEntity {

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: "Other" })
  type: string;

  @Column({ type: 'float' })
  protein: number;

  @Column({ type: 'float' })
  fat: number;

  @Column({ type: 'float' })
  carbs: number;

  @Column({ type: 'float' })
  sugar: number;

  @Column({type: 'float'})
  calories: number;

  @Column({ type: 'varchar', nullable: true})
  image?: string;

  constructor(
    name: string,
    type: string,
    protein: number,
    fat: number,
    carbs: number,
    sugar: number,
    calories: number,
    createdBy: User,
    image?: string,
  ) {
    super(createdBy)
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
