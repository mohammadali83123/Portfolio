const items = [
  "Java",
  "Python",
  "Go",
  "Spring Boot",
  "FastAPI",
  "OpenAI Agents SDK",
  "LangGraph",
  "RAG",
  "pgvector",
  "PostgreSQL",
  "Kubernetes",
  "AWS",
  "Azure",
  "Distributed Systems",
  "Event-Driven Architecture",
]

export function Ticker() {
  const row = items.map((item) => (
    <span key={item} className="inline-flex items-center gap-6 mx-3">
      {item} <span className="text-primary">◆</span>
    </span>
  ))

  return (
    <div className="border-b border-border overflow-hidden py-3 select-none" aria-hidden="true">
      <div className="flex w-max animate-ticker font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  )
}
