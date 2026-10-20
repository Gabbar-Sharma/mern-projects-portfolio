/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'

const ToastContext = createContext<{ addToast: (message: string) => void } | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])

  const addToast = (message: string) => {
    setItems((current) => [...current, message])
    setTimeout(() => {
      setItems((current) => current.slice(1))
    }, 2200)
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[80] flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-primary shadow-soft">
            {item}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('Toast context is missing')
  return context
}
