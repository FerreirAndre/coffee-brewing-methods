export enum CoffeeMethodType {
  POUR_OVER = 'POUR_OVER',
  IMMERSION = 'IMMERSION',
  ESPRESSO = 'ESPRESSO',
  COLD_BREW = 'COLD_BREW',
}

export const CoffeeMethodTypeLabels: Record<CoffeeMethodType, string> = {
  [CoffeeMethodType.POUR_OVER]: 'Coado / Filtrado',
  [CoffeeMethodType.IMMERSION]: 'Imersão',
  [CoffeeMethodType.ESPRESSO]: 'Espresso',
  [CoffeeMethodType.COLD_BREW]: 'Cold Brew',
};
