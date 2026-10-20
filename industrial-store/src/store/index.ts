import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/features/cart/store/cartSlice'
import wishlistReducer from '@/features/wishlist/store/wishlistSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
