import { useCartStore } from '@/store/cartStore'
import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/Button'
import CheckoutStepper from '@/components/shop/CheckoutStepper'

export default function Cart() {
  const { items, removeItem, updateQty, totalPrice, isEmpty } = useCartStore()
  const total = totalPrice()

  if (isEmpty()) {
    return (
      <div className="container-app py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-zinc-600 mb-4" />
        <h2 className="font-syne text-2xl font-bold mb-2">Tu carrito está vacío</h2>
        <p className="text-zinc-400 mb-6">Agrega productos para comenzar tu compra.</p>
        <Link to="/catalogo">
          <Button>Explorar Catálogo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <h1 className="font-syne text-2xl md:text-3xl font-bold mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-4 p-4 bg-dark-surface rounded-xl border border-zinc-800"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  {item.selectedSize} / {item.selectedColor}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.product.id, item.selectedSize, item.selectedColor, item.qty - 1)}
                      className="p-1.5 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.selectedSize, item.selectedColor, item.qty + 1)}
                      className="p-1.5 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-space font-bold text-primary">
                    ${(item.product.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                className="self-start p-2 text-zinc-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-dark-surface rounded-xl border border-zinc-800 p-6 h-fit sticky top-24">
          <h3 className="font-syne text-lg font-bold mb-4">Resumen</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Envío</span>
              <span>{total > 100 ? 'Gratis' : '$9.99'}</span>
            </div>
            <div className="border-t border-zinc-700 pt-3 flex justify-between font-bold text-base">
              <span>Total</span>
              <span className="font-space text-primary">${(total > 100 ? total : total + 9.99).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-zinc-800 pt-12">
        <CheckoutStepper />
      </div>
    </div>
  )
}
