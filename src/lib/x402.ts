// x402 seller stub (not wired yet).
//
// Per https://docs.x402.org/getting-started/quickstart-for-sellers:
// when we wire payments, install e.g. `@x402/hono` (or express/fastify)
// + `@x402/core`, `@x402/evm`, `@x402/svm` and protect paid routes with
// `paymentMiddleware` using the config below as the starting point.
//
// Testnet facilitator: https://x402.org/facilitator
// Mainnet: use a production facilitator (e.g. Coinbase CDP or PayAI)
// and switch networks to Base mainnet (eip155:8453) / Solana mainnet.

export const X402_FACILITATOR_URL =
  process.env.X402_FACILITATOR_URL ?? 'https://x402.org/facilitator'

// Receiving wallet for paid routes (set per env).
export const X402_PAY_TO_EVM = process.env.X402_PAY_TO_EVM ?? ''
export const X402_PAY_TO_SVM = process.env.X402_PAY_TO_SVM ?? ''

// Placeholder route pricing; wire into paymentMiddleware later.
export const x402PaidRoutes = {
  // 'GET /api/paid-example': {
  //   accepts: [
  //     { scheme: 'exact', price: '$0.001', network: 'eip155:84532', payTo: X402_PAY_TO_EVM },
  //   ],
  //   description: 'Paid example endpoint',
  //   mimeType: 'application/json',
  // },
} as const
