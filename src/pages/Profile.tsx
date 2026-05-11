import { User, MapPin, Package, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function Profile() {
  const user = {
    name: 'María García',
    email: 'maria@ejemplo.com',
    avatar: null,
  }

  return (
    <div className="container-app py-8">
      <h1 className="font-syne text-2xl md:text-3xl font-bold mb-8">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="md:col-span-1">
          <div className="bg-dark-surface rounded-xl border border-zinc-800 p-6 text-center">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User size={32} className="text-primary" />
            </div>
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-sm text-zinc-400">{user.email}</p>
            <Button variant="ghost" size="sm" className="mt-4">
              <LogOut size={14} /> Cerrar sesión
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-2 space-y-4">
          <Link
            to="/ordenes"
            className="flex items-center gap-4 p-5 bg-dark-surface rounded-xl border border-zinc-800 hover:border-primary/50 transition-all"
          >
            <div className="p-3 bg-primary/10 rounded-lg">
              <Package size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Mis Pedidos</h4>
              <p className="text-sm text-zinc-400">Ver historial de compras</p>
            </div>
          </Link>

          <div className="p-5 bg-dark-surface rounded-xl border border-zinc-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Direcciones</h4>
                <p className="text-sm text-zinc-400">Gestionar direcciones de envío</p>
              </div>
            </div>
            <div className="p-4 bg-zinc-900 rounded-lg">
              <p className="text-sm font-medium">Calle Luna 42</p>
              <p className="text-sm text-zinc-400">Madrid, Madrid 28001</p>
              <p className="text-sm text-zinc-400">España</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                Predeterminada
              </span>
            </div>
          </div>

          <Link
            to="/devolucion"
            className="flex items-center gap-4 p-5 bg-dark-surface rounded-xl border border-zinc-800 hover:border-primary/50 transition-all"
          >
            <div className="p-3 bg-primary/10 rounded-lg">
              <Package size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Devoluciones</h4>
              <p className="text-sm text-zinc-400">Iniciar o consultar una devolución</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
