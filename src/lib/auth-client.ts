import { createAuthClient } from 'better-auth/react'
import { stripeClient } from '@better-auth/stripe/client'
import {
  emailOTPClient,
  magicLinkClient,
  twoFactorClient,
} from 'better-auth/client/plugins'
import { agentAuthClient } from '@better-auth/agent-auth/client'

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    magicLinkClient(),
    twoFactorClient(),
    agentAuthClient(),
    stripeClient({
      subscription: true,
    }),
  ],
})
