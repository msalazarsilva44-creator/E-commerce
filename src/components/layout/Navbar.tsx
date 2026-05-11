import { Link } from 'react-router-dom'
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())
  const openDrawer = useUIStore((s) => s.openDrawer)

  const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Catálogo', to: '/catalogo' },
    { label: 'Ofertas', to: '/catalogo?filter=ofertas' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-dark/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="container-app flex items-center justify-between h-16">
        <Link to="/" className="font-syne text-2xl font-extrabold tracking-tight">
          <span className="text-primary">Tefa</span>
          <span className="text-white">Shop</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <Search size={20} className="text-zinc-300" />
          </button>
          <Link to="/perfil" className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <User size={20} className="text-zinc-300" />
          </Link>
          <button
            onClick={openDrawer}
            className="relative p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ShoppingBag size={20} className="text-zinc-300" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-zinc-800 bg-dark-surface">
          <div className="container-app py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-zinc-300 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
