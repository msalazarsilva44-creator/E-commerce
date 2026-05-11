import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Plus, Minus, Trash2, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components/ui/Button'

const COUPONS: Record<string, number> = {
  TEFA10: 0.1,
  NUEVO20: 0.2,
}

export default function CartDrawer() {
  const navigate = useNavigate()
  const { items, removeItem, updateQty, totalPrice, isEmpty } = useCartStore()
  const { isDrawerOpen, closeDrawer } = useUIStore()
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState('')

  const total = totalPrice()
  const discount = appliedCoupon ? total * COUPONS[appliedCoupon] : 0
  const shipping = total > 100 ? 0 : 9.99
  const finalTotal = total - discount + shipping

  const handleApplyCoupon = () => {
    const code = coupon.toUpperCase().trim()
    if (COUPONS[code]) {
      setAppliedCoupon(code)
      setCouponError('')
    } else {
      setCouponError('Cupón inválido')
      setAppliedCoupon(null)
    }
  }

  const handleCheckout = () => {
    closeDrawer()
    navigate('/carrito')
  }

  return (
    <>
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={closeDrawer} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-dark-surface border-l border-zinc-800 z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-zinc-800">
            <h2 className="font-syne text-lg font-bold">Tu Carrito</h2>
            <button onClick={closeDrawer} className="p-1 hover:bg-zinc-800 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {isEmpty() ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-zinc-400 mb-4">Tu carrito está vacío</p>
                <Button variant="outline" onClick={() => { closeDrawer(); navigate('/catalogo') }}>
                  Explorar catálogo
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-3 p-3 bg-zinc-900 rounded-xl"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.selectedSize, item.selectedColor, item.qty - 1)
                          }
                          className="p-1 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.selectedSize, item.selectedColor, item.qty + 1)
                          }
                          className="p-1 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-space text-sm font-bold text-primary">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                    className="self-start p-1 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {!isEmpty() && (
            <div className="border-t border-zinc-800 p-5 space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-700">
                  <Tag size={14} className="text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Código de cupón"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
                  />
                </div>
                <Button size="sm" variant="secondary" onClick={handleApplyCoupon}>
                  Aplicar
                </Button>
              </div>
              {couponError && <p className="text-xs text-red-400">{couponError}</p>}
              {appliedCoupon && (
                <p className="text-xs text-green-400">Cupón {appliedCoupon} aplicado (-{COUPONS[appliedCoupon] * 100}%)</p>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Descuento</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="font-space text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button fullWidth onClick={handleCheckout}>
                Ir al pago
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
