import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import Badge from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  view?: 'grid' | 'list'
}

export default function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const openDrawer = useUIStore((s) => s.openDrawer)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, product.sizes[0], product.colors[0].name)
    openDrawer()
  }

  if (view === 'list') {
    return (
      <div
        onClick={() => navigate(`/producto/${product.id}`)}
        className="flex gap-4 p-4 bg-dark-surface rounded-xl border border-zinc-800 hover:border-primary/50 transition-all cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-28 h-36 object-cover rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-zinc-400 mb-1">{product.category}</p>
            <h3 className="font-medium text-sm">{product.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-space font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => navigate(`/producto/${product.id}`)}
      className="group relative cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-dark-surface">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new">NUEVO</Badge>}
          {product.discount && <Badge variant="discount">-{product.discount}%</Badge>}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            setLiked(!liked)
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
        >
          <Heart
            size={18}
            className={liked ? 'fill-accent text-accent' : 'text-white'}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary-light text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={16} />
            {product.stock === 0 ? 'Agotado' : 'Agregar'}
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-zinc-400">{product.category}</p>
        <h3 className="font-medium text-sm text-zinc-100 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-space font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}
