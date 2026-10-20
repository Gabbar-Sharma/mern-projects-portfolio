import { useState } from 'react'
import { ShoppingCart, Star } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/features/products/components/ProductCard'
import { addItem } from '@/features/cart/store/cartSlice'
import { products } from '@/mocks/products'
import { useAppDispatch } from '@/store/hooks'

export default function ProductDetailsPage() {
  const { productId } = useParams()
  const product = products.find((entry) => entry.id === productId)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch()

  if (!product) {
    return <div className="container py-20 text-center text-xl font-semibold text-primary">Product not found</div>
  }

  const relatedProducts = products.filter((entry) => entry.categorySlug === product.categorySlug && entry.id !== product.id).slice(0, 3)

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <img src={product.image} alt={product.name} className="h-[500px] w-full rounded-2xl object-cover" />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{product.category}</div>
          <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] text-primary">{product.name}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500"><Star size={16} className="fill-yellow-400 text-yellow-400" /> {product.rating} ({product.reviews} reviews)</div>
          <div className="mt-4 text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</div>
          <div className="mt-4 flex items-center gap-3">
            <Badge variant={product.status === 'In stock' ? 'success' : 'warning'}>{product.status}</Badge>
            <span className="text-sm text-slate-500">SKU: {product.sku}</span>
          </div>
          <p className="mt-5 text-slate-600">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-medium text-primary">Qty</label>
            <div className="flex items-center rounded-md border border-border bg-white">
              <button type="button" className="px-3 py-2 text-lg" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
              <span className="min-w-8 text-center text-sm font-medium">{quantity}</span>
              <button type="button" className="px-3 py-2 text-lg" onClick={() => setQuantity((value) => value + 1)}>+</button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => dispatch(addItem({ product, quantity }))}><ShoppingCart size={16} /> Add to cart</Button>
            <Button variant="outline">Request a quote</Button>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-soft p-4">
            <h3 className="text-lg font-semibold text-primary">Technical specifications</h3>
            <div className="mt-4 space-y-3">
              {product.specs.map((spec) => (
                <div className="flex items-center justify-between border-b border-border pb-2 text-sm" key={spec.label}>
                  <span className="text-slate-500">{spec.label}</span>
                  <span className="font-medium text-primary">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-primary">Related products</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {relatedProducts.map((related) => <ProductCard key={related.id} product={related} />)}
        </div>
      </div>
    </div>
  )
}
