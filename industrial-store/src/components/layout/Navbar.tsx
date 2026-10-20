import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/Button'
import type { RootState } from '@/store'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Brands', to: '/brands' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Request Quote', to: '/request-quote' },
]

export function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  )

  return (
    <header className="border-b border-border bg-white">
      <div className="bg-primary px-4 py-2 text-center text-[11px] font-medium text-slate-200">
        Free shipping on orders over $100
      </div>
      <div className="container flex h-20 items-center gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-lg font-black text-white">
            I
          </div>
          <div>
            <div className="text-sm font-black uppercase tracking-[0.22em] text-primary">
              Industrial
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Store
            </div>
          </div>
        </Link>

        <form
          action="/search"
          method="get"
          className="hidden flex-1 items-center gap-3 rounded-xl border border-border bg-soft px-3 md:flex"
        >
          <Search size={16} className="text-slate-500" />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent py-3 text-sm text-primary outline-none placeholder:text-slate-400"
            placeholder="Search by part, brand or SKU"
            aria-label="Search products"
          />
          {query.trim() ? (
            <Link to={`/search?q=${encodeURIComponent(query.trim())}`}>
              <Button type="button" className="h-9 px-3">
                Search
              </Button>
            </Link>
          ) : (
            <Button type="button" className="h-9 px-3">
              Search
            </Button>
          )}
        </form>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/account"
            className="hidden items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-primary hover:bg-soft md:flex"
          >
            <User size={17} /> Account
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-primary transition hover:bg-soft"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </Link>
          <button
            className="rounded-md p-2 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav className="hidden items-center justify-between gap-6 border-t border-border px-4 py-3 md:flex">
        <div className="flex flex-wrap items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-accent' : 'text-slate-600 hover:text-primary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
          24/7 Service support
        </div>
      </nav>

      {open ? (
        <nav className="space-y-3 border-t border-border bg-white p-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="block rounded-md px-2 py-2 text-sm font-medium text-primary hover:bg-soft"
            >
              {link.label}
            </NavLink>
          ))}
          <form
            action="/search"
            method="get"
            className="flex items-center gap-2 rounded-xl border border-border bg-soft px-3 py-2"
          >
            <Search size={16} className="text-slate-500" />
            <input
              name="q"
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search"
            />
          </form>
        </nav>
      ) : null}
    </header>
  )
}
