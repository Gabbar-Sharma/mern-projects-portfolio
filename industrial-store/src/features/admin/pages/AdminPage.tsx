export default function AdminPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Admin dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-5"><div className="text-sm uppercase tracking-[0.15em] text-slate-500">Orders</div><div className="mt-2 text-3xl font-bold text-primary">184</div></div>
        <div className="rounded-xl border border-border bg-white p-5"><div className="text-sm uppercase tracking-[0.15em] text-slate-500">Inventory</div><div className="mt-2 text-3xl font-bold text-primary">2,430</div></div>
        <div className="rounded-xl border border-border bg-white p-5"><div className="text-sm uppercase tracking-[0.15em] text-slate-500">Quotes</div><div className="mt-2 text-3xl font-bold text-primary">26</div></div>
      </div>
      <div className="mt-8 rounded-xl border border-border bg-white p-6">
        <p className="text-slate-600">This dashboard is a frontend-only demo for admin workflows. It does not grant access to real inventory or sales systems.</p>
      </div>
    </div>
  )
}
