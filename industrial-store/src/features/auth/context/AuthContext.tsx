/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type AuthRole = 'customer' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: AuthRole
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  restoring: boolean
  login: (email: string, password?: string) => Promise<void>
  logout: () => void
  restoreSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const DEMO_USER: AuthUser = {
  id: 'customer-demo',
  name: 'Demo Buyer',
  email: 'buyer@industrialstore.demo',
  role: 'customer',
}

const ADMIN_USER: AuthUser = {
  id: 'admin-demo',
  name: 'Demo Admin',
  email: 'admin@industrialstore.demo',
  role: 'admin',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [restoring, setRestoring] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const restoreSession = useCallback(async () => {
    setRestoring(true)
    const stored = sessionStorage.getItem('industrial-store-demo-user')
    if (stored) {
      try {
        setUser(JSON.parse(stored) as AuthUser)
      } catch {
        setUser(null)
      }
    }
    setRestoring(false)
  }, [])

  useEffect(() => {
    void restoreSession()
  }, [restoreSession])

  const login = useCallback(async (email: string, password?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    void password
    const normalized = email.toLowerCase()
    const nextUser = normalized.includes('admin') ? ADMIN_USER : DEMO_USER
    setUser(nextUser)
    sessionStorage.setItem('industrial-store-demo-user', JSON.stringify(nextUser))
    const redirectTarget = sessionStorage.getItem('industrial-store-redirect') || '/account'
    sessionStorage.removeItem('industrial-store-redirect')
    const target = redirectTarget || location.pathname
    navigate(target, { replace: true })
  }, [location.pathname, navigate])

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem('industrial-store-demo-user')
    navigate('/login', { replace: true })
  }, [navigate])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      restoring,
      login,
      logout,
      restoreSession,
    }),
    [login, logout, restoreSession, user, restoring],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
