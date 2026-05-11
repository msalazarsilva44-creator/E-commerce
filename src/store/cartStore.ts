import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQty: (id: string, size: string, color: string, qty: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
  isEmpty: () => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, color) => {
        const items = get().items
        const existing = items.find(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
        )

        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
                ? { ...item, qty: item.qty + 1 }
                : item
            ),
          })
        } else {
          set({
            items: [...items, { product, qty: 1, selectedSize: size, selectedColor: color }],
          })
        }
      },

      removeItem: (id, size, color) => {
        set({
          items: get().items.filter(
            (item) =>
              !(item.product.id === id && item.selectedSize === size && item.selectedColor === color)
          ),
        })
      },

      updateQty: (id, size, color, qty) => {
        if (qty <= 0) {
          get().removeItem(id, size, color)
          return
        }
        set({
          items: get().items.map((item) =>
            item.product.id === id && item.selectedSize === size && item.selectedColor === color
              ? { ...item, qty }
              : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.qty, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.qty, 0),

      isEmpty: () => get().items.length === 0,
    }),
    {
      name: 'tefa-cart',
    }
  )
)
