import { describe, expect, it } from 'vitest'
import { products } from '@/mocks/products'
import { filterProducts } from '@/features/products/utils/filterProducts'

describe('filterProducts', () => {
  it('filters by search and category', () => {
    const result = filterProducts(products, {
      query: 'servo',
      category: 'electrical',
    })

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Atlas 24V DC Servo Drive')
  })

  it('sorts by price ascending', () => {
    const result = filterProducts(products, { sort: 'price-asc' })
    expect(result[0].price).toBeLessThanOrEqual(result[1].price)
  })

  it('filters by backorder availability', () => {
    const result = filterProducts(products, { availability: 'backorder' })
    expect(result.every((product) => product.status === 'Backorder')).toBe(true)
  })
})
