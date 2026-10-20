import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '@/features/products/components/ProductCard'
import { brands, products } from '@/mocks/products'

export default function BrandPage() {
  const { brandSlug } = useParams()
  const brand = brands.find((entry) => entry.slug === brandSlug)
  const items = products.filter((product) => product.brandSlug === brandSlug)

  if (!brand) return <div className="container py-20 text-center text-lg font-medium text-primary">Brand not found</div>

  return (
    <div className="container py-10">
      <div className="mb-8 rounded-2xl bg-[#eef4ff] p-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Brand</div>
        <h1 className="mt-2 text-3xl font-bold text-primary">{brand.name}</h1>
        <p className="mt-2 text-slate-600">Sample catalog page for {brand.name}. Browse production-ready components and support products.</p>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-slate-500">{items.length} products</div>
        <Link to="/brands" className="text-sm font-semibold text-accent">Back to all brands</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.length ? items.map((product) => <ProductCard key={product.id} product={product} />) : <div className="col-span-full text-center text-muted">No products available for this brand.</div>}
      </div>
    </div>
  )
}
