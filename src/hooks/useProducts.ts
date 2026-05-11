import { useState, useEffect } from 'react'
import { productService } from '@/services/productService'
import type { Product } from '@/types/product'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService.getAll().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  return { products, loading }
}
