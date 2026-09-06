# awfixer.me

Personal site + platform for **AWFixer — Founder, iResolved LLC**.

Brutalist orange (`#FF4D00`) marketing site for Solved Corp && Solved Labs, Chained Tools, and Bob's Computer — with a DatoCMS-powered blog, full auth/billing stack, type-safe APIs (oRPC), MCP server, and AI-ready TanStack Start app.

Live links:

- Site: `awfixer.me` (this repo)
- Blog: [theautist.me](https://theautist.me)
- X: [theautist.link/x](https://theautist.link/x)
- GitHub: [github.com/awfixer](https://github.com/awfixer)
- Chained Tools: [chained.tools](https://chained.tools) / [github.com/chainedtools](https://github.com/chainedtools)
- Bob's Computer: [bobs.computer](https://bobs.computer) / [github.com/bobs-computer](https://github.com/bobs-computer)

> Tinkerer. Stroke victim. Autistic. Proud American. Red-blooded capitalist.  
> *Fix it. Ship it. Own it.*

---

## Features

**Site / Content**

- Kinetic typographic hero, skewed marquee, vertical service list, creed interlude, dispatches, giant CTA — all in `src/components/awfixer/AwfixerPage.tsx`
- File-based routing with TanStack Router + Start (`src/routes/`)
- Blog index + slug pages backed by DatoCMS (`/blog`, `/blog/$slug`)
- shadcn/ui (`new-york`, zinc) + Tailwind CSS v4 + Lucide icons
- Storybook + Superdesign pages for component development

**Platform / Backend**

- **Auth:** Better-Auth with email/password, email OTP, magic link, 2FA, HaveIBeenPwned, TanStack Start cookies, Agent Auth (`delegated` + `autonomous`)
- **Billing:** Better-Auth Stripe plugin — `starter` / `pro` plans (14-day pro trial), customer auto-create on signup
- **Email:** Resend for verification, reset, OTP, 2FA
- **Analytics/Attribution:** PostHog (client + provider) + Dub lead tracking
- **DB:** Neon Postgres (`pg` Pool) — see `db/init.sql` for `todos` starter schema
- **APIs:** oRPC router (`listTodos`, `addTodo`) served at `/api/rpc/*` + TanStack Query integration
- **MCP:** MCP server at `/mcp` (Streamable HTTP) exposing `addTodo` tool
- **AI:** TanStack AI (OpenAI, Anthropic, Gemini, Ollama) — scaffolded via add-ons
- **GraphQL:** Apollo Client integration scaffold
- **Observability:** Sentry (TanStack Start + Vite plugin) + PostHog
- **Env validation:** t3-env (`src/env.ts`)
- **x402:** payment-gated helper scaffold in `src/lib/x402.ts`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | TanStack Start + React 19 + Vite 8 + Nitro |
| Router | TanStack Router (file-router, `tsr.config.json`) |
| Styling | Tailwind CSS v4, `tw-animate-css`, `@tailwindcss/typography`, shadcn |
| Forms / Tables / State | TanStack Form, Table, Store, Query, DB collections |
| Auth | `better-auth` + `@better-auth/*` |
| DB | Neon Postgres + `@neondatabase/serverless` + `pg` |
| CMS | DatoCMS CDA (`@datocms/cda-client` + fetch client in `src/lib/datoCms.ts`) |
| API | oRPC + Zod + OpenAPI |
| AI / Agents | TanStack AI + MCP SDK + Agent Auth |
| Email / Billing / Links | Resend, Stripe, Dub |
| Observability | Sentry, PostHog |
| Tooling | Bun, TypeScript, ESLint (TanStack config), Prettier, Vitest, Storybook |

Chosen add-ons (see `.cta.json`): `eslint, railway, sentry, ai, compiler, db, form, mcp, oRPC, shadcn, t3env, table, better-auth, store, posthog, tanstack-query, neon, storybook, apollo-client`.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (packageManager per `.cta.json`)
- Postgres (Neon recommended — `neon.new` / Launchpad)
- Optional: Stripe CLI, Resend domain, Dub token, DatoCMS token, PostHog, Sentry

### 1. Install

```bash
bun install
```

### 2. Configure env

```bash
cp .env.example .env.local
# fill in real values — placeholders will warn/fail at runtime
```

| Var | Used for |
|---|---|
| `DATABASE_URL` / `DATABASE_URL_POOLER` | Neon Postgres (Better-Auth + `pg` Pool) — auto-created by Neon Launchpad |
| `STRIPE_SECRET_KEY` | Stripe API (`sk_test_...` / `sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification (`whsec_...`) |
| `STRIPE_PRICE_STARTER` / `STRIPE_PRICE_PRO` | Price IDs for subscription plans |
| `RESEND_API_KEY` | Transactional email (`re_...`) |
| `RESEND_FROM` | Sender, e.g. `AWFixer Auth <auth@awfixer.me>` |
| `DUB_TOKEN` | Dub attribution (`dub_...`) |
| `DATO_CMS_API_TOKEN` | DatoCMS CDA (server-only, blog) |
| `VITE_APP_TITLE` | Optional client title (t3-env) |
| `SERVER_URL` | Optional server URL (t3-env) |

> `src/lib/auth.ts` falls back to `sk_test_placeholder`, `whsec_placeholder`, `price_placeholder_*`, `dub_placeholder` for local boot — replace before deploying.

### 3. Init DB (optional starter data)

```bash
psql $DATABASE_URL -f db/init.sql
```

Creates + seeds `todos(id, title, description, is_completed, created_at)`.

### 4. Run dev

```bash
bun run dev
# → http://localhost:3000 (vite dev + instrument.server.mjs)
```

### 5. Other scripts

```bash
bun run build          # vite build + copy instrument.server.mjs → .output/server
bun run start          # node --import ./.output/server/instrument.server.mjs .output/server/index.mjs
bun run preview        # vite preview
bun run test           # vitest run (dotenv + .env.local)
bun run lint           # eslint
bun run format         # prettier --write + eslint --fix
bun run check          # prettier --check
bun run generate-routes # tsr generate
```

---

## Project Structure

```
src/
  components/
    awfixer/AwfixerPage.tsx  # main landing page (hero, arsenal, creed, dispatches, CTA)
    superdesign/             # design playground
    ui/                      # shadcn: button, input, label, select, slider, switch, textarea
    BlogPost*.tsx
  routes/
    index.tsx                # / → AwfixerPage (+ SEO head)
    blog.tsx                 # /blog (DatoCMS loader)
    blog.[slug].tsx          # /blog/:slug
    mcp.ts                   # POST /mcp (MCP Streamable HTTP)
    api.rpc.$.ts             # oRPC handler
    api.$.ts                 # generic API passthrough
    api/auth/$.ts            # Better-Auth handler
    __root.tsx               # root layout + providers
  lib/
    auth.ts                  # Better-Auth server config (Stripe, Dub, OTP, magic link, 2FA, agent-auth)
    auth-client.ts           # client auth
    datoCms.ts               # DatoCMS fetch client
    email.ts                 # Resend sender
    x402.ts                  # x402 helper
    utils.ts                 # cn() etc.
  orpc/
    router/todos.ts          # listTodos / addTodo
    router/index.ts
    client.ts / schema.ts
  integrations/
    apollo/ posthog/ tanstack-query/ better-auth/
  db-collections/ db.ts      # TanStack DB + pg pool wiring
  mcp-todos.ts               # file-backed todos for MCP tool
  router.tsx / routeTree.gen.ts
db/init.sql                  # todos schema + seed
```

### Routes

| Path | Description |
|---|---|
| `/` | Landing page |
| `/blog` | Blog index (DatoCMS) |
| `/blog/:slug` | Single post |
| `/mcp` | MCP endpoint (`POST`) |
| `/api/rpc/*` | oRPC |
| `/api/auth/*` | Auth (sign-up/in, OTP, magic link, Stripe webhooks) |

---

## Integrations — Quick Notes

- **Better-Auth (`src/lib/auth.ts`):** `pg` Pool adapter, `appName: AWFixer`. Enable providers/flows by editing `createAuthOptions()`.
- **Stripe:** set real keys + price IDs + webhook secret; forward webhooks to `/api/auth/*` in dev (`stripe listen`).
- **DatoCMS:** needs `DATO_CMS_API_TOKEN` + `blogPost` model with `slug`, `title`, `publishedAt`, `draft`. Without it, blog returns empty + console warning.
- **MCP:** test with an MCP inspector pointing `POST` at `/mcp`; tool `addTodo({ title })` persists to `mcp-todos.json`.
- **oRPC:** add procedures in `src/orpc/router/` and export from `index.ts`; client in `src/orpc/client.ts`.
- **Sentry/PostHog/Apollo:** providers under `src/integrations/` — add DSN/keys to enable.

---

## Deployment

Build output is Nitro (`.output/server/index.mjs` with Sentry instrumentation). Any Node host works; the scaffold includes a `railway` add-on.

```bash
bun run build
bun run start
# ensure DATABASE_URL + Stripe/Resend/Dub/Dato env vars are set in prod
```

---

## License

See [LICENSE](./LICENSE).
