import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// error-tracking.ts reads VITE_HUB_TOKEN and VITE_HUB_URL at module load time into
// module-level constants, so each test that needs different env values must call
// vi.resetModules() + dynamic import to get a fresh module instance.

describe('reportError', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  describe('no-op behavior', () => {
    it('does not fetch when not in production mode', async () => {
      // Default test environment has import.meta.env.PROD = false
      vi.stubEnv('VITE_HUB_TOKEN', 'test-token')
      vi.stubEnv('VITE_HUB_URL', 'https://hub.example.com')
      const { reportError } = await import('./error-tracking')
      reportError(new Error('test'))
      expect(fetch).not.toHaveBeenCalled()
    })

    it('does not fetch when VITE_HUB_TOKEN is not set', async () => {
      vi.stubEnv('PROD', true)
      vi.stubEnv('VITE_HUB_TOKEN', '')
      vi.stubEnv('VITE_HUB_URL', 'https://hub.example.com')
      const { reportError } = await import('./error-tracking')
      reportError(new Error('test'))
      expect(fetch).not.toHaveBeenCalled()
    })

    it('does not fetch when VITE_HUB_URL is not set', async () => {
      vi.stubEnv('PROD', true)
      vi.stubEnv('VITE_HUB_TOKEN', 'test-token')
      vi.stubEnv('VITE_HUB_URL', '')
      const { reportError } = await import('./error-tracking')
      reportError(new Error('test'))
      expect(fetch).not.toHaveBeenCalled()
    })
  })

  describe('active error reporting', () => {
    beforeEach(() => {
      vi.stubEnv('PROD', true)
      vi.stubEnv('VITE_HUB_TOKEN', 'test-token')
      vi.stubEnv('VITE_HUB_URL', 'https://hub.example.com')
    })

    it('sends a POST to the hub endpoint with correct auth header', async () => {
      const { reportError } = await import('./error-tracking')
      reportError(new Error('crash'))
      expect(fetch).toHaveBeenCalledOnce()
      expect(fetch).toHaveBeenCalledWith(
        'https://hub.example.com/hub/client-errors/report',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'WorkerHub test-token',
          }),
        })
      )
    })

    it('includes error message and stack in the request body', async () => {
      const { reportError } = await import('./error-tracking')
      const error = new Error('vue component error')
      reportError(error)
      const [, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0]
      const body = JSON.parse(init.body)
      expect(body.message).toBe('vue component error')
      expect(body.stack).toBe(error.stack)
    })

    it('includes optional context in request body — Vue errorHandler path', async () => {
      const { reportError } = await import('./error-tracking')
      // Mirrors how main.ts calls reportError from app.config.errorHandler
      reportError(new Error('render failure'), { vueInfo: 'render function' })
      const [, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0]
      const body = JSON.parse(init.body)
      expect(body.context).toEqual({ vueInfo: 'render function' })
    })

    it('includes optional context in request body — unhandledrejection path', async () => {
      const { reportError } = await import('./error-tracking')
      // Mirrors how main.ts calls reportError from the unhandledrejection listener
      reportError(new Error('promise rejected'), { type: 'unhandledrejection' })
      const [, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0]
      const body = JSON.parse(init.body)
      expect(body.context).toEqual({ type: 'unhandledrejection' })
    })

    it('fails silently when fetch rejects', async () => {
      ;(fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'))
      const { reportError } = await import('./error-tracking')
      expect(() => reportError(new Error('test'))).not.toThrow()
    })
  })
})
