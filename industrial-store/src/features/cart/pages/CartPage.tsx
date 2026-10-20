import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { clearCart, removeItem, updateQuantity } from '@/features/cart/store/cartSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (!items.length) {
    return <div className="container py-20 text-center"><h1 className="text-3xl font-bold text-primary">Your cart is empty</h1><p className="mt-3 text-slate-600">Add industrial parts to continue shopping.</p><div className="mt-6"><Link to="/products"><Button>Browse products</Button></Link></div></div>
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Shopping cart</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex flex-col gap-4 rounded-xl border border-border bg-white p-4 md:flex-row md:items-center">
              <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="text-lg font-semibold text-primary">{item.product.name}</div>
                <div className="text-sm text-slate-500">{item.product.brand}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-md border border-border bg-soft">
                  <button type="button" className="px-2 py-1" onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}><Minus size={14} /></button>
                  <span className="min-w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button type="button" className="px-2 py-1" onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}><Plus size={14} /></button>
                </div>
                <div className="w-20 text-right font-semibold text-primary">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                <button type="button" onClick={() => dispatch(removeItem(item.productId))} className="text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
        <aside className="rounded-xl border border-border bg-white p-5">
          <div className="text-lg font-semibold text-primary">Order summary</div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Shipping</span><span>₹0</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Tax</span><span>₹0</span></div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold text-primary"><span>Total</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          </div>
          <Link to="/checkout" className="mt-6 block"><Button className="w-full">Proceed to checkout</Button></Link>
          <Button variant="ghost" className="mt-3 w-full" onClick={() => dispatch(clearCart())}>Clear cart</Button>
        </aside>
      </div>
    </div>
  )
}
