import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { Product } from '@/features/products/types/product'
import { addItem } from '@/features/cart/store/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/features/wishlist/store/wishlistSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()
  const wishlist = useAppSelector((state) => state.wishlist.items)
  const isWishlisted = wishlist.includes(product.id)

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-52 w-full object-cover" />
        <button
          type="button"
          onClick={() => {
            if (isWishlisted) dispatch(removeFromWishlist(product.id))
            else dispatch(addToWishlist(product.id))
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-600 shadow-sm"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{product.brand}</span>
          <Badge variant={product.status === 'In stock' ? 'success' : product.status === 'Low stock' ? 'warning' : 'default'}>{product.status}</Badge>
        </div>
        <Link to={`/products/${product.id}`} className="text-lg font-semibold text-primary hover:text-accent">{product.name}</Link>
        <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          <Star size={14} className="fill-yellow-400 text-yellow-400" /> {product.rating} <span>({product.reviews})</span>
        </div>
        <div className="mt-3 text-xs uppercase tracking-[0.12em] text-slate-500">{product.category}</div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</div>
            <div className="text-xs text-slate-500">SKU: {product.sku}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="primary" className="flex-1" onClick={() => dispatch(addItem({ product, quantity: 1 }))}><ShoppingCart size={15} /> Add</Button>
          <Link to={`/products/${product.id}`} className="flex-1"><Button variant="outline" className="w-full">Details</Button></Link>
        </div>
      </div>
    </Card>
  )
}
