import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  loader: async () => {
    // Dynamically import the DatoCMS client – this runs only on the server
    // in TanStack Start loaders, so the API token never reaches the browser.
    const module = await import('@/lib/datoCms')
    const { datoClient } = module

    // The existing placeholder implements .search() & .toPlain()
    const { items } = await datoClient.items
      .search('blogPost', {
        filter: { draft: { eq: false } },
        sort: [{ field: 'publishedAt', direction: 'DESC' }],
        depth: 1,
      })
      .toPlain()

    return items
  },
  component: ({ data }) => {
    import '@/components/BlogPostList'
    return (
      <section className="prose max-w-prose mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <BlogPostList posts={data} />
      </section>
    )
  },
})