import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { TestHelpers } from 'better-auth/plugins'

import { auth, pool } from './auth'
import { testAuth } from './auth-test'

describe('testUtils', () => {
  let test: TestHelpers

  beforeAll(async () => {
    const ctx = await testAuth.$context
    test = ctx.test
  })

  afterAll(async () => {
    await pool.end()
  })

  it('exposes helpers on the test-only instance', () => {
    expect(test).toBeDefined()
    expect(typeof test.createUser).toBe('function')
    expect(typeof test.getAuthHeaders).toBe('function')
  })

  it('keeps helpers out of the production instance', async () => {
    const ctx = await auth.$context
    expect('test' in ctx).toBe(false)
  })

  it('round-trips a user: save, authenticate, cleanup', async () => {
    const user = test.createUser({ email: 'test-utils@example.com' })
    await test.saveUser(user)
    try {
      const headers = await test.getAuthHeaders({ userId: user.id })
      const session = await testAuth.api.getSession({ headers })
      expect(session?.user.id).toBe(user.id)
      expect(session?.user.email).toBe('test-utils@example.com')
    } finally {
      await test.deleteUser(user.id)
    }
  })
})
