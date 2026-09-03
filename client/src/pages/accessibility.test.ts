import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const source = (name: string) => readFileSync(resolve(process.cwd(), 'client/src/pages', name), 'utf8')
const styles = readFileSync(resolve(process.cwd(), 'client/src/index.css'), 'utf8')

describe('AgriNexus enhanced frontend accessibility contracts', () => {
  it('keeps login authentication as a semantic keyboard-reachable button', () => {
    const login = source('Login.tsx')
    expect(login).toContain('onClick={() => startLogin()}')
    expect(login).toContain('Continue with Google / Manus')
    expect(login).toContain('aria-label="AgriNexus home"')
  })

  it('keeps dashboard actions as labelled native controls', () => {
    const dashboard = source('Dashboard.tsx')
    expect(dashboard).toContain('aria-label="Sign out"')
    expect(dashboard).toContain('aria-label="Add farm"')
    expect(dashboard).toContain('onClick={() => startLogin()}')
  })

  it('defines visible focus and reduced-motion safeguards', () => {
    expect(styles).toContain('button:focus-visible, a:focus-visible')
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)')
  })
})
