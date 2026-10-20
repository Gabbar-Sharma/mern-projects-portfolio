import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function UnauthorizedPage() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold text-primary">Access restricted</h1>
      <p className="mt-3 text-muted">This area is for authorized admin users only.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/"><Button>Back home</Button></Link>
        <Link to="/login"><Button variant="outline">Login</Button></Link>
      </div>
    </div>
  )
}
