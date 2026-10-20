import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export class ErrorBoundary extends Component<Props> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App error boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold text-primary">Something went wrong</h1>
          <p className="mt-3 text-muted">The app hit an unexpected error. Please refresh and try again.</p>
        </div>
      )
    }

    return this.props.children
  }
}
