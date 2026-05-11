import type { CartItem } from './cart'
import type { ShippingAddress } from './user'

export interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: CartItem[]
  total: number
  shipping: ShippingAddress
  trackingNumber?: string
}
