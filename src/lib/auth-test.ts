import { betterAuth } from 'better-auth'
import { testUtils } from 'better-auth/plugins'

import { createAuthOptions } from './auth'

// Test-only auth instance. The testUtils plugin exposes privileged helpers
// (create sessions, persist/delete users) on `ctx.test` and must never be
// added to the production config in `./auth`.
const options = createAuthOptions()

export const testAuth = betterAuth({
  ...options,
  plugins: [...(options.plugins ?? []), testUtils({ captureOTP: true })],
})
