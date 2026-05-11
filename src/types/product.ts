export interface Color {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  category: string
  description: string
  sizes: string[]
  colors: Color[]
  stock: number
  rating: number
  reviewCount: number
  isNew: boolean
  tags: string[]
}
