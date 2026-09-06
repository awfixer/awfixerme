/**
 * DatoCMS Content Delivery API client (fetch-based).
 * Reads the API token from DATO_CMS_API_TOKEN env var (server-only).
 * No external npm package required – just native fetch.
 */

const DATO_API_TOKEN = process.env.DATO_CMS_API_TOKEN

if (!DATO_API_TOKEN) {
  console.warn(
    '[datoCms] DATO_CMS_API_TOKEN is not set. Blog data will not load.',
  )
}

/**
 * Search for DatoCMS items and return the parsed items array.
 */
export const fetchDatoBlogPosts = async () => {
  if (!DATO_API_TOKEN) {
    return { posts: [], error: new Error('DATO_CMS_API_TOKEN not configured') }
  }

  const baseUrl = 'https://api.dato cms.com/v2'
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${DATO_API_TOKEN}`,
  }

  const params = new URLSearchParams()
  // Filter: only published posts (not drafts)
  params.append('filter', JSON.stringify({ draft: { eq: false } }))
  // Sort by published date, newest first
  params.append('sort', 'publishedAt:DESC')
  // Depth 1 to include basic related data
  params.append('depth', '1')

  const url = `${baseUrl}/items?model=blogPost&${params.toString()}`
  const resp = await fetch(url, { headers })

  if (!resp.ok) {
    const errBody = await resp.text()
    return { posts: [], error: new Error(`DatoCMS error ${resp.status}: ${errBody}`) }
  }

  const data = (await resp.json()) as {
    items: any[]
    total: number
    page: number
    pageSize: number
  }

  return { posts: data.items, error: null }
}

/**
 * Fetch a single blog post by slug.
 */
export const fetchDatoBlogPostBySlug = async (slug: string) => {
  if (!DATO_API_TOKEN) {
    return { post: null, error: new Error('DATO_CMS_API_TOKEN not configured') }
  }

  const baseUrl = 'https://api.dato cms.com/v2'
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${DATO_API_TOKEN}`,
  }

  const params = new URLSearchParams()
  params.append('filter', JSON.stringify({ slug: { eq: slug }, draft: { eq: false } }))
  params.append('depth', '2')

  const url = `${baseUrl}/items?model=blogPost&${params.toString()}`
  const resp = await fetch(url, { headers })

  if (!resp.ok) {
    const errBody = await resp.text()
    return { post: null, error: new Error(`DatoCMS error ${resp.status}: ${errBody}`) }
  }

  const data = (await resp.json()) as {
    items: any[]
    total: number
  }

  if (!data.items?.length) {
    return { post: null, error: null }
  }

  return { post: data.items[0], error: null }
}