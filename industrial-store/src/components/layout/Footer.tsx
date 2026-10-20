import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-slate-200">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-lg font-black text-white">C</div>
            <div className="text-base font-bold tracking-tight text-white">ControlKart</div>
          </div>
          <p className="text-sm text-slate-300">Industrial supplies for reliable production, maintenance and engineering teams.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Shop</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/products">All products</Link></li>
            <li><Link to="/categories/electrical">Electrical</Link></li>
            <li><Link to="/categories/pneumatics">Pneumatics</Link></li>
            <li><Link to="/brands">Brands</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Support</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/returns">Returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Company</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/request-quote">Request quote</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 text-center text-xs text-slate-300">
        <div className="container py-4">Sample industrial storefront for demo purposes. Not a real supplier or payment processor.</div>
      </div>
    </footer>
  )
}
