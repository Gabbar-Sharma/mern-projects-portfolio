import { type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from '@/components/feedback/ToastProvider'
import { queryClient } from '@/lib/queryClient'
import { store } from '@/store'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastProvider>{children}</ToastProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ReduxProvider>
  )
}
