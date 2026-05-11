import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, ChevronRight } from 'lucide-react'
import { orderService } from '@/services/orderService'
import type { Order } from '@/types/order'
import Spinner from '@/components/ui/Spinner'

const statusLabels: Record<Order['status'], string> = {
  pending: 'Pendiente',
  processing: 'Procesando',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  processing: 'bg-blue-500/10 text-blue-400',
  shipped: 'bg-purple-500/10 text-purple-400',
  delivered: 'bg-green-500/10 text-green-400',
  cancelled: 'bg-red-500/10 text-red-400',
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService.getAll().then((data) => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <h1 className="font-syne text-2xl md:text-3xl font-bold mb-8">Mis Pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-zinc-600 mb-4" />
          <p className="text-zinc-400">No tienes pedidos aún.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/ordenes/${order.id}`}
              className="flex items-center justify-between p-5 bg-dark-surface rounded-xl border border-zinc-800 hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-800 rounded-lg">
                  <Package size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-zinc-400">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
                <span className="font-space font-bold">${order.total.toFixed(2)}</span>
                <ChevronRight size={16} className="text-zinc-500" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
