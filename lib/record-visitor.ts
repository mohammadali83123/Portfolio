/**
 * Records a visitor who introduced themselves at the welcome gate.
 * Static-site safe: runs in the browser and fans out to two best-effort,
 * independent sinks. Both credentials below are public-by-design — the
 * Supabase anon key is gated by a row-level-security INSERT policy, and the
 * Formspree endpoint is meant to be called from the client.
 *
 *   1. Supabase  — permanent, queryable record (PostgREST insert)
 *   2. Formspree — instant email notification
 *
 * Fire-and-forget: never blocks the UI, survives the page transition via
 * keepalive, and fails silently so a down service can't break the visit.
 */
export function recordVisitor(input: {
  name: string
  email: string
  referrer?: string
  honeypot?: string
}) {
  if (input.honeypot) return // bot tripped the hidden field
  const name = input.name.trim().slice(0, 80)
  const email = input.email.trim().slice(0, 120)
  if (!name && !email) return

  const referrer = (input.referrer || "").slice(0, 300)
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 300) : ""

  // 1) Supabase (anon key + RLS insert policy)
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (sbUrl && sbKey) {
    fetch(`${sbUrl}/rest/v1/visitors`, {
      method: "POST",
      headers: {
        apikey: sbKey,
        Authorization: `Bearer ${sbKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      keepalive: true,
      body: JSON.stringify({ name, email, referrer, user_agent: userAgent }),
    }).catch(() => {})
  }

  // 2) Formspree (email notification)
  const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
  if (formspree) {
    fetch(formspree, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      keepalive: true,
      body: JSON.stringify({ name, email, referrer, _subject: `New portfolio visitor: ${name || email}` }),
    }).catch(() => {})
  }
}
