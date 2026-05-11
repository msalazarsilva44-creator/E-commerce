import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, Truck, MapPin } from 'lucide-react'
import { orderService } from '@/services/orderService'
import type { Order } from '@/types/order'
import Spinner from '@/components/ui/Spinner'

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      orderService.getById(id).then((o) => {
        setOrder(o || null)
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container-app py-20 text-center">
        <p className="text-zinc-400">Orden no encontrada.</p>
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Volver a pedidos
      </button>

      <h1 className="font-syne text-2xl font-bold mb-6">Pedido {order.id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-surface rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package size={20} className="text-primary" />
            <h3 className="font-medium">Estado del pedido</h3>
          </div>
          <p className="text-sm text-zinc-400">Fecha: {order.date}</p>
          <p className="text-sm text-zinc-400 mt-1">Estado: <span className="text-white capitalize">{order.status}</span></p>
          {order.trackingNumber && (
            <div className="mt-4 flex items-center gap-2">
              <Truck size={16} className="text-zinc-400" />
              <span className="text-sm text-zinc-300">Tracking: {order.trackingNumber}</span>
            </div>
          )}
        </div>

        <div className="bg-dark-surface rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={20} className="text-primary" />
            <h3 className="font-medium">Dirección de envío</h3>
          </div>
          <p className="text-sm text-zinc-300">{order.shipping.name}</p>
          <p className="text-sm text-zinc-400">{order.shipping.street}</p>
          <p className="text-sm text-zinc-400">{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
          <p className="text-sm text-zinc-400">{order.shipping.phone}</p>
        </div>
      </div>

      <div className="mt-6 bg-dark-surface rounded-xl border border-zinc-800 p-6">
        <h3 className="font-medium mb-4">Total del pedido</h3>
        <p className="font-space text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
      </div>
    </div>
  )
}
