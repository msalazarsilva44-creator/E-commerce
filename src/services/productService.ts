import { products } from '@/data/products.mock'
import type { Product } from '@/types/product'

export const productService = {
  getAll: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products), 300)
    })
  },

  getById: async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products.find((p) => p.id === id)), 200)
    })
  },

  getBySlug: async (slug: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products.find((p) => p.slug === slug)), 200)
    })
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products.filter((p) => p.category === category)), 200)
    })
  },

  search: async (query: string): Promise<Product[]> => {
    const q = query.toLowerCase()
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            products.filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q))
            )
          ),
        200
      )
    })
  },
}
