import { Link } from 'react-router-dom'
import { ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function OrdersPage() {
  return <section className="container page-section"><Link to="/account" className="back-link">← Account</Link><div className="page-heading"><div><span className="eyebrow">CUSTOMER CENTER</span><h1>Order history.</h1><p>Orders placed through this sample storefront are not real.</p></div></div><div className="empty-state"><ClipboardList size={34} /><h2>No demo orders yet</h2><p>Once connected to a backend, your order history will be shown here.</p><Link to="/products"><Button variant="outline">Browse catalog</Button></Link></div></section>
}
