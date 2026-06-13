export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          designed &amp; built by <span className="text-primary">Mohammad Ali</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          built with next.js — karachi, pk
        </p>
      </div>
    </footer>
  )
}
