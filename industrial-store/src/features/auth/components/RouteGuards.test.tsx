import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { GuestRoute, ProtectedRoute } from './RouteGuards'

vi.mock('@/features/auth/context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    isAdmin: false,
    restoring: false,
    login: vi.fn(),
    logout: vi.fn(),
    restoreSession: vi.fn(),
  }),
}))

describe('Route guards', () => {
  it('redirects guests to login from protected routes', () => {
    render(
      <MemoryRouter initialEntries={['/account']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<div>Account page</div>} />
          </Route>
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Login page')).toBeInTheDocument()
    expect(screen.queryByText('Account page')).not.toBeInTheDocument()
  })

  it('allows guests to view guest-only routes', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<div>Login page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Login page')).toBeInTheDocument()
  })
})
