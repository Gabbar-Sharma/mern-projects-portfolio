import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
  className?: string
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-md border text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-60',
    {
      'border-accent bg-accent text-white hover:bg-[#0f4ec8]': variant === 'primary',
      'border-border bg-soft text-primary hover:bg-[#edf3fa]': variant === 'secondary',
      'border-border bg-white text-primary hover:border-accent hover:text-accent': variant === 'outline',
      'border-transparent bg-transparent text-primary hover:text-accent': variant === 'ghost',
    },
    className,
  )

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
