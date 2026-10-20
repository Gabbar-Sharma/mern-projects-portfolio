import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface WishlistState {
  items: string[]
}

const initialState: WishlistState = { items: [] }

if (typeof window !== 'undefined') {
  const saved = window.localStorage.getItem('industrial-store-wishlist')
  if (saved) {
    try {
      initialState.items = JSON.parse(saved)
    } catch {
      initialState.items = []
    }
  }
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) state.items.push(action.payload)
      window.localStorage.setItem('industrial-store-wishlist', JSON.stringify(state.items))
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload)
      window.localStorage.setItem('industrial-store-wishlist', JSON.stringify(state.items))
    },
  },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
