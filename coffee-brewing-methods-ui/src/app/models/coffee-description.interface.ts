import { GrindSize } from "./enums/grind-size.enum";
import { RoastLevel } from "./enums/roast-level.enum";

export interface CoffeeDescription {
  id: number;
  coffeeGrams: number;
  grindSize: GrindSize;
  roastLevel: RoastLevel;
}

export interface CoffeeDescriptionDto {
  grindSize: GrindSize;
  roastLevel: RoastLevel;
  coffeeGrams: number;
}
