import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '@/features/products/types/product'

interface CartItem {
  productId: string
  quantity: number
  product: Product
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = { items: [] }

if (typeof window !== 'undefined') {
  const cart = window.localStorage.getItem('industrial-store-cart')
  if (cart) {
    try {
      initialState.items = JSON.parse(cart)
    } catch {
      initialState.items = []
    }
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload
      const existing = state.items.find((item) => item.productId === product.id)

      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ productId: product.id, product, quantity })
      }

      window.localStorage.setItem('industrial-store-cart', JSON.stringify(state.items))
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((entry) => entry.productId === action.payload.productId)
      if (!item) return

      item.quantity = Math.max(0, action.payload.quantity)
      if (item.quantity === 0) {
        state.items = state.items.filter((entry) => entry.productId !== action.payload.productId)
      }

      window.localStorage.setItem('industrial-store-cart', JSON.stringify(state.items))
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((entry) => entry.productId !== action.payload)
      window.localStorage.setItem('industrial-store-cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      window.localStorage.setItem('industrial-store-cart', JSON.stringify([]))
    },
  },
})

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
