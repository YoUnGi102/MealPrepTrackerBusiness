import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'float' })
  protein: number;

  @Column({ type: 'float' })
  fat: number;

  @Column({ type: 'float' })
  carbs: number;

  @Column({ type: 'float' })
  sugar: number;

  @Column({ type: 'varchar' })
  image: string;

  constructor(
    name: string,
    type: string,
    protein: number,
    fat: number,
    carbs: number,
    sugar: number,
    image: string,
  ) {
    this.name = name;
    this.type = type;
    this.protein = protein;
    this.fat = fat;
    this.carbs = carbs;
    this.sugar = sugar;
    this.image = image;
  }
}
