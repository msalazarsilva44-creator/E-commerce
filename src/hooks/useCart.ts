import { useCartStore } from '@/store/cartStore'

export const useCart = () => {
  const store = useCartStore()
  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQty: store.updateQty,
    clearCart: store.clearCart,
    totalItems: store.totalItems(),
    totalPrice: store.totalPrice(),
    isEmpty: store.isEmpty(),
  }
}
