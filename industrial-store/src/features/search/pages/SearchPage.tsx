import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '@/features/products/components/ProductCard'
import { products } from '@/mocks/products'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim().toLowerCase()
  const filtered = query
    ? products.filter((product) => [product.name, product.brand, product.sku, product.category].join(' ').toLowerCase().includes(query))
    : products

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Search</h1>
      <p className="mt-2 text-slate-600">{query ? `Results for “${query}”` : 'Browse the full catalog'}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <div className="col-span-full text-center text-slate-500">No matching products found.</div>}
      </div>
    </div>
  )
}
