import type { Product } from '@/types/product'
import ProductCard from './ProductCard'
import Spinner from '@/components/ui/Spinner'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  view?: 'grid' | 'list'
}

export default function ProductGrid({ products, loading = false, view = 'grid' }: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-400">No se encontraron productos.</p>
      </div>
    )
  }

  if (view === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} view="list" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
