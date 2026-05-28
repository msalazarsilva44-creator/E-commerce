import { Link } from 'react-router-dom'
import { Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-dark-surface mt-20">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-syne text-xl font-bold mb-4">
              <span className="text-primary">Online</span>Shop
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Moda urbana para quienes se atreven a destacar. Envío gratis en pedidos +$100.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-zinc-200 mb-3 uppercase tracking-wide">Tienda</h4>
            <ul className="space-y-2">
              <li><Link to="/catalogo" className="text-sm text-zinc-400 hover:text-white transition-colors">Catálogo</Link></li>
              <li><Link to="/catalogo?category=Camisetas" className="text-sm text-zinc-400 hover:text-white transition-colors">Camisetas</Link></li>
              <li><Link to="/catalogo?category=Calzado" className="text-sm text-zinc-400 hover:text-white transition-colors">Calzado</Link></li>
              <li><Link to="/catalogo?category=Accesorios" className="text-sm text-zinc-400 hover:text-white transition-colors">Accesorios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm text-zinc-200 mb-3 uppercase tracking-wide">Cuenta</h4>
            <ul className="space-y-2">
              <li><Link to="/perfil" className="text-sm text-zinc-400 hover:text-white transition-colors">Mi Perfil</Link></li>
              <li><Link to="/ordenes" className="text-sm text-zinc-400 hover:text-white transition-colors">Mis Pedidos</Link></li>
              <li><Link to="/devolucion" className="text-sm text-zinc-400 hover:text-white transition-colors">Devoluciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm text-zinc-200 mb-3 uppercase tracking-wide">Síguenos</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-zinc-800 hover:bg-primary rounded-lg transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-zinc-800 hover:bg-primary rounded-lg transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-500">&copy; 2024 Online Shop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
