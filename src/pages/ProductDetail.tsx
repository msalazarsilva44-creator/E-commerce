import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Minus, Plus, ShoppingBag, Heart, ArrowLeft } from 'lucide-react'
import { productService } from '@/services/productService'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import type { Product } from '@/types/product'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [qty, setQty] = useState(1)
  const [liked, setLiked] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const openDrawer = useUIStore((s) => s.openDrawer)

  useEffect(() => {
    if (id) {
      productService.getById(id).then((p) => {
        if (p) {
          setProduct(p)
          setSelectedSize(p.sizes[0])
          setSelectedColor(p.colors[0].name)
        }
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

  if (!product) {
    return (
      <div className="container-app py-20 text-center">
        <p className="text-zinc-400">Producto no encontrado.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/catalogo')}>
          Volver al catálogo
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize, selectedColor)
    }
    openDrawer()
  }

  return (
    <div className="container-app py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-dark-surface">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm text-zinc-400 mb-1">{product.category}</p>
          <h1 className="font-syne text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-600'}
                />
              ))}
            </div>
            <span className="text-sm text-zinc-400">({product.reviewCount} reseñas)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-space text-3xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-zinc-500 line-through">${product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-sm font-medium rounded">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-300 leading-relaxed mb-6">{product.description}</p>

          {/* Color */}
          <div className="mb-5">
            <p className="text-sm font-medium mb-2">Color: <span className="text-zinc-400">{selectedColor}</span></p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name ? 'border-primary scale-110' : 'border-zinc-600'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Talla</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-primary text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to cart */}
          <div className="flex items-center gap-4 mt-auto">
            <div className="flex items-center gap-3 bg-zinc-800 rounded-lg px-3 py-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)}>
                <Plus size={16} />
              </button>
            </div>

            <Button
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingBag size={18} />
              {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </Button>

            <button
              onClick={() => setLiked(!liked)}
              className="p-3 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Heart size={20} className={liked ? 'fill-accent text-accent' : ''} />
            </button>
          </div>

          {/* Stock info */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-xs text-accent mt-3">¡Solo quedan {product.stock} unidades!</p>
          )}
        </div>
      </div>
    </div>
  )
}
