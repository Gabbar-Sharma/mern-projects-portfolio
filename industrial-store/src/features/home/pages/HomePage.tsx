import { ArrowRight, BadgeCheck, Boxes, Headphones, PackageCheck, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProductCard } from '@/features/products/components/ProductCard'
import { products } from '@/mocks/products'

const categories = [
  { label: 'Bearings & power transmission', slug: 'bearings', icon: '◉', count: '1,240+ items' },
  { label: 'Electrical & automation', slug: 'electrical', icon: 'ϟ', count: '860+ items' },
  { label: 'Pneumatics & fluid power', slug: 'pneumatics', icon: '↗', count: '540+ items' },
  { label: 'Safety & PPE', slug: 'safety', icon: '◇', count: '720+ items' },
]

export default function HomePage() {
  return (
    <>
      <section className="bg-[#f5f8fc]">
        <div className="container grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              <span className="h-px w-6 bg-accent" /> Your industrial supply partner
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.06em] text-primary md:text-5xl">Built for the work that keeps us moving.</h1>
            <p className="mt-5 max-w-xl text-base text-slate-600">Dependable parts, tools and essentials for production teams who build, maintain and keep operations running without surprises.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products"><Button>Explore products <ArrowRight size={16} /></Button></Link>
              <Link to="/request-quote"><Button variant="outline">Request a volume quote</Button></Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              <span className="inline-flex items-center gap-2"><BadgeCheck size={16} className="text-green-600" /> Quality checked</span>
              <span className="inline-flex items-center gap-2"><PackageCheck size={16} className="text-green-600" /> Clear stock visibility</span>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=90" alt="Technician reviewing industrial equipment" className="h-[420px] w-full rounded-2xl object-cover shadow-soft" />
            <div className="absolute -bottom-4 left-4 rounded-xl bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#eaf3ff] text-accent"><Boxes size={20} /></div>
                <div>
                  <div className="text-sm font-bold text-primary">Parts that perform</div>
                  <div className="text-xs text-slate-500">Ready for the real world</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="container grid gap-4 py-8 md:grid-cols-4">
          <div className="border-r border-border pr-4"><div className="text-xs uppercase tracking-[0.18em] text-slate-500">Spec with confidence</div><div className="mt-2 text-sm text-slate-600">Detailed product information</div></div>
          <div className="border-r border-border pr-4"><div className="text-xs uppercase tracking-[0.18em] text-slate-500">Plan with clarity</div><div className="mt-2 text-sm text-slate-600">Visible availability indicators</div></div>
          <div className="border-r border-border pr-4"><div className="text-xs uppercase tracking-[0.18em] text-slate-500">Get the right support</div><div className="mt-2 text-sm text-slate-600">Help from our product team</div></div>
          <div className="flex items-center gap-3"><Headphones size={22} className="text-accent" /> <div><div className="text-sm font-semibold text-primary">Need a hand?</div><div className="text-xs text-slate-500">We’re here to help</div></div></div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Shop by category</div>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-primary">Everything your operation needs.</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">View all products <ArrowRight size={15} /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.slug} to={`/categories/${category.slug}`} className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-soft text-lg text-accent">{category.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-primary">{category.label}</div>
                <div className="text-xs text-slate-500">{category.count}</div>
              </div>
              <ArrowRight size={16} className="text-slate-400" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Popular picks</div>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-primary">Reliable parts. Ready to work.</h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">Shop all products <ArrowRight size={15} /></Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <Card className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#eaf3ff] text-accent"><Headphones size={22} /></div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Here when you need us</div>
              <h2 className="mt-1 text-2xl font-bold text-primary">Big order? Hard-to-find part?</h2>
            </div>
          </div>
          <p className="max-w-xl text-slate-600">Tell us what you’re working on and our team will help source the right fit with less back-and-forth.</p>
          <Link to="/request-quote"><Button>Talk to our team</Button></Link>
        </Card>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Why choose us</div>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-primary">Trust built around your operation.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-soft p-6"><ShieldCheck className="text-accent" /><h3 className="mt-4 text-xl font-bold text-primary">Verified supply quality</h3><p className="mt-2 text-sm text-slate-600">Sample-only storefront content for product and order validation on the frontend.</p></div>
            <div className="rounded-xl border border-border bg-soft p-6"><PackageCheck className="text-accent" /><h3 className="mt-4 text-xl font-bold text-primary">Transparent availability</h3><p className="mt-2 text-sm text-slate-600">Know which products are ready to ship and which require follow-up.</p></div>
            <div className="rounded-xl border border-border bg-soft p-6"><Headphones className="text-accent" /><h3 className="mt-4 text-xl font-bold text-primary">Responsive support</h3><p className="mt-2 text-sm text-slate-600">Helpful guidance for maintenance planning, bulk purchases and replacement sourcing.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}
