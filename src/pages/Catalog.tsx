import { useState, useMemo } from 'react'
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import ProductGrid from '@/components/shop/ProductGrid'
import FilterSidebar, { type Filters } from '@/components/shop/FilterSidebar'

export default function Catalog() {
  const { products, loading } = useProducts()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 500],
    colors: [],
    sizes: [],
  })

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false
      if (filters.colors.length > 0 && !p.colors.some((c) => filters.colors.includes(c.name))) return false
      if (filters.sizes.length > 0 && !p.sizes.some((s) => filters.sizes.includes(s))) return false
      return true
    })
  }, [products, filters])

  return (
    <div className="container-app py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-syne text-2xl md:text-3xl font-bold">Catálogo</h1>
          <p className="text-sm text-zinc-400 mt-1">{filteredProducts.length} productos</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-primary text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
          >
            <SlidersHorizontal size={18} />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-primary text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-primary text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {showFilters && (
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>
        )}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} loading={loading} view={view} />
        </div>
      </div>
    </div>
  )
}
