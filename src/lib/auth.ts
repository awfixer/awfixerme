import { betterAuth } from 'better-auth'
import type { BetterAuthOptions } from 'better-auth'
import {
  haveIBeenPwned,
  emailOTP,
  magicLink,
  twoFactor,
} from 'better-auth/plugins'
import { agentAuth } from '@better-auth/agent-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { stripe } from '@better-auth/stripe'
import { dubAnalytics } from '@dub/better-auth'
import { Pool } from 'pg'
import Stripe from 'stripe'
import { Dub } from 'dub'

import { sendEmail } from './email'

// Placeholder keys — replace with real values from the Stripe Dashboard
// (Developers → API keys) and `stripe listen` / Dashboard → Webhooks.
// Env vars take precedence when set.
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder'
const STRIPE_WEBHOOK_SECRET =
  process.env.STRIPE_WEBHOOK_SECRET ?? 'whsec_placeholder'
const STRIPE_PUBLISHABLE_KEY =
  process.env.STRIPE_PUBLISHABLE_KEY ?? 'pk_test_placeholder'

const stripeClient = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2026-08-26.dahlia',
})

export { stripeClient }

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export { pool }

// Placeholder token — replace with a real token from https://app.dub.co
// (Settings → Developer → API keys). Env var takes precedence when set.
const DUB_TOKEN = process.env.DUB_TOKEN ?? 'dub_placeholder'

const dubClient = new Dub({ token: DUB_TOKEN })

export function createAuthOptions(): BetterAuthOptions {
  return {
    database: pool,
    appName: 'AWFixer',
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url }) => {
        void sendEmail({
          to: user.email,
          subject: 'Reset your password',
          text: `Click the link to reset your password: ${url}`,
        })
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url }) => {
        void sendEmail({
          to: user.email,
          subject: 'Verify your email address',
          text: `Click the link to verify your email: ${url}`,
        })
      },
    },
    plugins: [
      tanstackStartCookies(),
      haveIBeenPwned(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          const subject =
            type === 'sign-in'
              ? 'Your sign-in code'
              : type === 'email-verification'
                ? 'Verify your email address'
                : 'Reset your password'
          void sendEmail({
            to: email,
            subject,
            text: `Your one-time code is: ${otp}`,
          })
        },
      }),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          void sendEmail({
            to: email,
            subject: 'Your sign-in link',
            text: `Click the link to sign in: ${url}`,
          })
        },
      }),
      twoFactor({
        issuer: 'AWFixer',
        otpOptions: {
          async sendOTP({ user, otp }) {
            void sendEmail({
              to: user.email,
              subject: 'Your two-factor code',
              text: `Your two-factor code is: ${otp}`,
            })
          },
        },
      }),
      agentAuth({
        providerName: 'AWFixer',
        providerDescription: 'AWFixer APIs for AI agents.',
        modes: ['delegated', 'autonomous'],
        capabilities: [
          {
            name: 'list_todos',
            description: 'List todos the current user can access.',
          },
        ],
        async onExecute({ capability, agentSession }) {
          switch (capability) {
            case 'list_todos':
              return { ok: true, requestedBy: agentSession.user.id }
            default:
              throw new Error(`Unsupported capability: ${capability}`)
          }
        },
      }),
      dubAnalytics({ dubClient }),
      stripe({
        stripeClient,
        stripeWebhookSecret: STRIPE_WEBHOOK_SECRET,
        createCustomerOnSignUp: true,
        subscription: {
          enabled: true,
          plans: [
            {
              name: 'starter',
              priceId:
                process.env.STRIPE_PRICE_STARTER ?? 'price_placeholder_starter',
              limits: {
                projects: 5,
                storage: 10,
              },
            },
            {
              name: 'pro',
              priceId: process.env.STRIPE_PRICE_PRO ?? 'price_placeholder_pro',
              limits: {
                projects: 50,
                storage: 100,
              },
              freeTrial: {
                days: 14,
              },
            },
          ],
        },
      }),
    ],
  }
}

export const auth = betterAuth(createAuthOptions())
