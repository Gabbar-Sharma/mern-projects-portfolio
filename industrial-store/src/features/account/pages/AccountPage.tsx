import { useAuth } from '@/features/auth/context/AuthContext'

export default function AccountPage() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Account</h1>
      <div className="mt-6 rounded-xl border border-border bg-white p-6">
        <div className="text-lg font-semibold text-primary">{user.name}</div>
        <div className="mt-2 text-sm text-slate-600">{user.email}</div>
        <div className="mt-4 text-sm text-slate-500">Role: {user.role}</div>
        <button type="button" onClick={logout} className="mt-6 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white">Logout</button>
      </div>
    </div>
  )
}
