import { useState } from 'react'
import { X } from 'lucide-react'
import { categories } from '@/data/categories.mock'
import Button from '@/components/ui/Button'

export interface Filters {
  categories: string[]
  priceRange: [number, number]
  colors: string[]
  sizes: string[]
}

interface FilterSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const allColors = [
  { name: 'Negro', hex: '#000000' },
  { name: 'Blanco', hex: '#FFFFFF' },
  { name: 'Gris', hex: '#808080' },
  { name: 'Azul', hex: '#0000FF' },
  { name: 'Rojo', hex: '#FF0000' },
  { name: 'Verde', hex: '#008000' },
]

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const [priceMin, setPriceMin] = useState(filters.priceRange[0])
  const [priceMax, setPriceMax] = useState(filters.priceRange[1])

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500

  const toggleCategory = (cat: string) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat]
    onChange({ ...filters, categories: updated })
  }

  const toggleColor = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]
    onChange({ ...filters, colors: updated })
  }

  const toggleSize = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    onChange({ ...filters, sizes: updated })
  }

  const handlePriceChange = () => {
    onChange({ ...filters, priceRange: [priceMin, priceMax] })
  }

  const clearFilters = () => {
    setPriceMin(0)
    setPriceMax(500)
    onChange({ categories: [], priceRange: [0, 500], colors: [], sizes: [] })
  }

  return (
    <aside className="space-y-6">
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-1 text-xs">
          <X size={14} /> Limpiar filtros
        </Button>
      )}

      <div>
        <h4 className="text-sm font-medium mb-3">Categorías</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-primary focus:ring-primary"
              />
              <span className="text-sm text-zinc-300">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Precio</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(Number(e.target.value))}
            onBlur={handlePriceChange}
            className="w-20 px-2 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-sm text-white"
            min={0}
          />
          <span className="text-zinc-500">-</span>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            onBlur={handlePriceChange}
            className="w-20 px-2 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-sm text-white"
            min={0}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Color</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                filters.colors.includes(color.name)
                  ? 'border-primary scale-110'
                  : 'border-zinc-600 hover:border-zinc-400'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Talla</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filters.sizes.includes(size)
                  ? 'bg-primary text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
