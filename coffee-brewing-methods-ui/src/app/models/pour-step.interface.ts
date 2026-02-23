export interface PourStep {
  id: number;
  orderNumber: number;
  amountGrams: number;
  instructions: string;
}

export interface PourStepDto {
  orderNumber: number;
  amountGrams: number;
  instructions: string;
}
