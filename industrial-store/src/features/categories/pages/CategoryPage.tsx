import { useParams } from 'react-router-dom'
import { ProductCard } from '@/features/products/components/ProductCard'
import { products } from '@/mocks/products'

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const items = products.filter((product) => product.categorySlug === categorySlug)

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">{categorySlug ? categorySlug.replace('-', ' ') : 'Category'}</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.length ? items.map((product) => <ProductCard key={product.id} product={product} />) : <div className="col-span-full text-center text-slate-500">No products in this category yet.</div>}
      </div>
    </div>
  )
}
