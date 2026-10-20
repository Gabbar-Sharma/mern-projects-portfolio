import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold text-primary">Page not found</h1>
      <p className="mt-3 text-muted">The page you requested could not be found.</p>
      <div className="mt-6 flex justify-center">
        <Link to="/"><Button>Return home</Button></Link>
      </div>
    </div>
  )
}
