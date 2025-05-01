import {Macros} from "./Macros";

// TODO Create ENUM
export interface Ingredient extends Macros{
  id: number;
  name: string;
  type: string;
  image: string; // URL or file path to the image
}
