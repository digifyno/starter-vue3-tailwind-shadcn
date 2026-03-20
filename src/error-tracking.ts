// Reports unhandled errors to the Client Error Intelligence Hub.
// Hub endpoint: POST /hub/client-errors/report
// Auth: WorkerHub token (set at build time via VITE_HUB_TOKEN env var)
// Only reports in production (import.meta.env.PROD); silently skipped otherwise.

const HUB_TOKEN = import.meta.env.VITE_HUB_TOKEN
const HUB_URL = import.meta.env.VITE_HUB_URL || ''

export function reportError(error: Error, context?: Record<string, unknown>): void {
  if (!import.meta.env.PROD || !HUB_TOKEN || !HUB_URL) return

  fetch(`${HUB_URL}/hub/client-errors/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `WorkerHub ${HUB_TOKEN}`,
    },
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      context,
    }),
  }).catch(() => {}) // Fail silently — never let error reporting crash the app
}
