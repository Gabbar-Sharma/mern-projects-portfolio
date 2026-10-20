export type ProductStatus = 'In stock' | 'Low stock' | 'Backorder' | 'Discontinued'

export interface Product {
  id: string
  name: string
  brand: string
  brandSlug: string
  sku: string
  category: string
  categorySlug: string
  price: number
  rating: number
  reviews: number
  status: ProductStatus
  image: string
  description: string
  specs: { label: string; value: string }[]
  tags: string[]
  featured?: boolean
}
