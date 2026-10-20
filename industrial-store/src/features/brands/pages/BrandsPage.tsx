import { Link } from 'react-router-dom'
import { brands } from '@/mocks/products'

export default function BrandsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Brands</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {brands.map((brand) => (
          <Link key={brand.slug} to={`/brands/${brand.slug}`} className="rounded-xl border border-border bg-white p-5 shadow-sm transition hover:border-accent">
            <div className="text-lg font-semibold text-primary">{brand.name}</div>
            <div className="mt-2 text-sm text-slate-500">{brand.count} products</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
