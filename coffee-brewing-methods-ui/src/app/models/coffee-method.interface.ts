import {
  CoffeeDescription,
  CoffeeDescriptionDto,
} from './coffee-description.interface';
import { CoffeeMethodType } from './enums/coffee-method-type.enum';
import { PourStep, PourStepDto } from './pour-step.interface';

export interface CoffeeMethod {
  id: number;
  name: string;
  type: CoffeeMethodType;
  waterTemperature: number;
  description: string;
  coffeeDescription?: CoffeeDescription;
  steps?: PourStep[];
}

export interface CoffeeMethodDetailsDto extends CoffeeMethod {
  coffeeDescription: CoffeeDescription;
  steps: PourStep[];
}

export interface CoffeeMethodSaveDto {
  name: string;
  type: CoffeeMethodType;
  waterTemperature: number;
  description: string;
  coffeeDescription: CoffeeDescriptionDto;
  steps: PourStepDto[];
}
