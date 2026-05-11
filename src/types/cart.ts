import type { Product } from './product'

export interface CartItem {
  product: Product
  qty: number
  selectedSize: string
  selectedColor: string
}
