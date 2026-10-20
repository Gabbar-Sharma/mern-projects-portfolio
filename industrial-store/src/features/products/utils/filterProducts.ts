import type { Product } from '@/features/products/types/product'

export interface ProductFilters {
  query?: string
  category?: string
  brand?: string
  availability?: 'all' | 'in-stock' | 'low-stock' | 'backorder'
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'name'
}

export function filterProducts(products: Product[], filters: ProductFilters = {}) {
  const query = (filters.query ?? '').trim().toLowerCase()
  let result = [...products]

  if (query) {
    result = result.filter((product) =>
      [product.name, product.brand, product.category, product.sku].join(' ').toLowerCase().includes(query),
    )
  }

  if (filters.category && filters.category !== 'all') {
    result = result.filter((product) => product.categorySlug === filters.category)
  }

  if (filters.brand && filters.brand !== 'all') {
    result = result.filter((product) => product.brandSlug === filters.brand)
  }

  if (filters.availability && filters.availability !== 'all') {
    if (filters.availability === 'in-stock') {
      result = result.filter((product) => product.status === 'In stock')
    }
    if (filters.availability === 'low-stock') {
      result = result.filter((product) => product.status === 'Low stock')
    }
    if (filters.availability === 'backorder') {
      result = result.filter((product) => product.status === 'Backorder')
    }
  }

  if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price)
  if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price)
  if (filters.sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name))

  return result
}
