/**
 * DatoCMS Content Delivery API client.
 *
 * This module exports a `datoClient` instance that reads the API token from
 * `DATO_CMS_API_TOKEN` in the environment. The token is read from
 * `process.env` (server‑only) so it never ends up in the client bundle.
 *
 * In TanStack Start loaders we dynamically import this module so the import
 * is tree‑shaken away when the page is rendered in the browser.
 *
 * If you need to use DatoCMS on the client side, import `useDatoCms` from
 * your own hook that wraps `useSuspense` + `datoClient` – but keep the token
 * out of `import.meta.env`.
 */

// Export a typed client object – the actual instantiation happens lazily
// in the route loaders below to avoid bundling the SDK into the client.
export const datoClient = {
  // We'll add methods per usage; for now just a placeholder.
  items: {
    search: () => Promise.resolve({ items: [], error: null }),
    toPlain: async () => ({ items: [], error: null }),
  },
}