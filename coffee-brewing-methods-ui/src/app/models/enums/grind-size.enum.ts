export enum GrindSize {
  EXTRA_FINE = 'EXTRA_FINE',
  FINE = 'FINE',
  MEDIUM_FINE = 'MEDIUM_FINE',
  MEDIUM = 'MEDIUM',
  MEDIUM_COARSE = 'MEDIUM_COARSE',
  COARSE = 'COARSE',
}

export const GrindSizeLabels: Record<GrindSize, string> = {
  [GrindSize.EXTRA_FINE]: 'Extra Fina',
  [GrindSize.FINE]: 'Fina',
  [GrindSize.MEDIUM_FINE]: 'Média-Fina',
  [GrindSize.MEDIUM]: 'Média',
  [GrindSize.MEDIUM_COARSE]: 'Média-Grossa',
  [GrindSize.COARSE]: 'Grossa'
}
