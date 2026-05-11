export const categories = [
  'Camisetas',
  'Pantalones',
  'Vestidos',
  'Calzado',
  'Accesorios',
  'Outerwear',
] as const

export type Category = (typeof categories)[number]
