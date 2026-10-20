export function LoadingScreen({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="flex items-center gap-3 text-sm font-medium text-muted">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        {text}
      </div>
    </div>
  )
}
