import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/features/products/components/ProductCard'
import { brands, categories, products } from '@/mocks/products'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'
  const brand = searchParams.get('brand') ?? 'all'
  const availability = searchParams.get('availability') ?? 'all'
  const sort = searchParams.get('sort') ?? 'featured'
  const query = searchParams.get('q') ?? ''

  const filtered = useMemo(() => {
    let result = [...products]

    if (query) {
      result = result.filter((product) => [product.name, product.brand, product.category, product.sku].join(' ').toLowerCase().includes(query.toLowerCase()))
    }

    if (category !== 'all') {
      result = result.filter((product) => product.categorySlug === category)
    }

    if (brand !== 'all') {
      result = result.filter((product) => product.brandSlug === brand)
    }

    if (availability !== 'all') {
      if (availability === 'in-stock') {
        result = result.filter((product) => product.status === 'In stock')
      }
      if (availability === 'low-stock') {
        result = result.filter((product) => product.status === 'Low stock')
      }
      if (availability === 'backorder') {
        result = result.filter((product) => product.status === 'Backorder')
      }
    }

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [brand, category, query, sort, availability])

  const patchParams = (updates: Record<string, string | undefined>) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '') next.delete(key)
      else next.set(key, value)
    })
    setSearchParams(next)
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Catalog</div>
          <h1 className="mt-2 text-3xl font-bold text-primary">Industrial products</h1>
        </div>
        <div className="text-sm text-slate-500">{filtered.length} product(s)</div>
      </div>

      <div className="mb-8 grid gap-4 rounded-2xl border border-border bg-white p-4 md:grid-cols-5">
        <Input label="Search" value={query} onChange={(event) => patchParams({ q: event.target.value })} />

        <label className="block text-sm text-primary">
          <span className="mb-1.5 block font-medium">Category</span>
          <select className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm" value={category} onChange={(event) => patchParams({ category: event.target.value })}>
            <option value="all">All</option>
            {categories.map((entry) => (
              <option key={entry.slug} value={entry.slug}>{entry.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-primary">
          <span className="mb-1.5 block font-medium">Brand</span>
          <select className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm" value={brand} onChange={(event) => patchParams({ brand: event.target.value })}>
            <option value="all">All</option>
            {brands.map((entry) => (
              <option key={entry.slug} value={entry.slug}>{entry.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-primary">
          <span className="mb-1.5 block font-medium">Availability</span>
          <select className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm" value={availability} onChange={(event) => patchParams({ availability: event.target.value })}>
            <option value="all">Any</option>
            <option value="in-stock">In stock</option>
            <option value="low-stock">Low stock</option>
            <option value="backorder">Backorder</option>
          </select>
        </label>

        <label className="block text-sm text-primary">
          <span className="mb-1.5 block font-medium">Sort</span>
          <select className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm" value={sort} onChange={(event) => patchParams({ sort: event.target.value })}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setSearchParams({})}>Reset filters</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <div className="col-span-full text-center text-slate-500">No matching products found.</div>}
      </div>
    </div>
  )
}
