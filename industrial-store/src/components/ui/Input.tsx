import { type InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <label className="block text-sm text-primary">
      {label ? <span className="mb-1.5 block font-medium">{label}</span> : null}
      <input
        className={clsx(
          'w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-primary shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10',
          error && 'border-red-400 focus:border-red-400',
          className,
        )}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  )
}
