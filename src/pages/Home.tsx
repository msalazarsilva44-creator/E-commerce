import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react'
import { products } from '@/data/products.mock'
import ProductCard from '@/components/shop/ProductCard'
import Button from '@/components/ui/Button'

export default function Home() {
  const newProducts = products.filter((p) => p.isNew).slice(0, 4)
  const featuredProducts = products.filter((p) => p.discount).slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-app py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
              Nueva Colección 2024
            </span>
            <h1 className="font-syne text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Moda urbana que{' '}
              <span className="text-primary">define tu estilo</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-lg">
              Descubre las últimas tendencias en streetwear. Piezas únicas diseñadas para quienes se atreven a destacar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalogo">
                <Button size="lg">
                  Ver Catálogo <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/catalogo?filter=ofertas">
                <Button variant="outline" size="lg">
                  Ofertas
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* Features */}
      <section className="border-y border-zinc-800 bg-dark-surface">
        <div className="container-app py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Truck size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Envío Gratis</p>
              <p className="text-xs text-zinc-400">En pedidos mayores a $100</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Shield size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Pago Seguro</p>
              <p className="text-xs text-zinc-400">Encriptación SSL 256-bit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <RotateCcw size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Devolución Fácil</p>
              <p className="text-xs text-zinc-400">30 días para devolver</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-app py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-syne text-2xl md:text-3xl font-bold">Recién Llegados</h2>
          <Link to="/catalogo?filter=new" className="text-sm text-primary hover:text-primary-light transition-colors flex items-center gap-1">
            Ver todo <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container-app">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 p-10 md:p-16">
          <div className="max-w-md">
            <h3 className="font-syne text-2xl md:text-3xl font-bold mb-3">Usa cupón de descuento</h3>
            <p className="text-zinc-300 mb-6">Obtén un 10% de descuento en tu primera compra. Válido por tiempo limitado.</p>
            <Link to="/catalogo">
              <Button>Comprar Ahora</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Deals */}
      <section className="container-app py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-syne text-2xl md:text-3xl font-bold">Ofertas Especiales</h2>
          <Link to="/catalogo?filter=ofertas" className="text-sm text-primary hover:text-primary-light transition-colors flex items-center gap-1">
            Ver todo <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
