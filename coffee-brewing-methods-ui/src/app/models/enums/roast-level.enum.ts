export enum RoastLevel {
  LIGHT = 'LIGHT',
  MEDIUM_LIGHT = 'MEDIUM_LIGHT',
  MEDIUM = 'MEDIUM',
  MEDIUM_DARK = 'MEDIUM_DARK',
  DARK = 'DARK'
}

export const RoastLevelLabels: Record<RoastLevel, string> = {
  [RoastLevel.LIGHT]: 'Clara',
  [RoastLevel.MEDIUM_LIGHT]: 'Média-Clara',
  [RoastLevel.MEDIUM]: 'Média',
  [RoastLevel.MEDIUM_DARK]: 'Média-Escura',
  [RoastLevel.DARK]: 'Escura'
};
