import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/:slug')({
  loader: async ({ params }) => {
    const { datoClient } = await import('@/lib/datoCms')

    const { data, error } = await datoClient.items
      .search('blogPost', {
        filter: { slug: { eq: params.slug }, draft: { eq: false } },
        depth: 2,
      })
      .toPlain()

    if (error) throw error
    if (!data?.items?.length) return null

    return data.items[0]
  },
  component: async ({ data }) => {
    const { BlogPost } = await import('@/components/BlogPost')

    if (!data) {
      return <p>Post not found</p>
    }

    return <BlogPost post={data} />
  },
})