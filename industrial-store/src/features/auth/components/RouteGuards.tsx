import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/AuthContext'

export function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    sessionStorage.setItem('industrial-store-redirect', location.pathname)
    return <Navigate to="/login" replace />
  }

  return user ? <Outlet /> : null
}

export function GuestRoute() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/account" replace />
  return <Outlet />
}

export function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    sessionStorage.setItem('industrial-store-redirect', location.pathname)
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) return <Navigate to="/unauthorized" replace />

  return <Outlet />
}
