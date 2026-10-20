import { type ReactNode } from 'react'

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' }) {
  const styles = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-700',
  }

  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[variant]}`}>{children}</span>
}
