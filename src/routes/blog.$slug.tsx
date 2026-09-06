import { createFileRoute } from '@tanstack/react-router'
import { fetchDatoBlogPostBySlug } from '@/lib/datoCms'

export const Route = createFileRoute('/blog/:slug')({
  loader: async ({ params }) => {
    const { post, error } = await fetchDatoBlogPostBySlug(params.slug)

    if (error) throw error
    return { post }
  },
  component: ({ data }) => {
    const { post } = data || {}
    if (!post) {
      return <p>Post not found</p>
    }

    const title = post.attributes?.title || post.title || 'Untitled'
    const publishedAt = post.attributes?.publishedAt
    const excerpt = post.attributes?.excerpt
    const body = post.attributes?.body
    const tags = post.attributes?.tags || []

    const formattedDate =
      publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined

    return (
      <article className="prose max-w-prose mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        {formattedDate && (
          <p className="text-sm text-muted-foreground mb-6">
            {formattedDate}
          </p>
        )}

        {excerpt && (
          <p className="text-lg text-muted-foreground mb-8">
            {excerpt}
          </p>
        )}

        {body && (
          <div
            dangerouslySetInnerHTML={{ __html: body }}
            className="prose-headings prose-invert if dark"
          />
        )}

        {tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag: string, i: number) => (
              <span
                key={tag}
                className="rounded-full border border-[#FF4D00] px-3 py-1 font-mono text-[10px] tracking-[-0.02em] uppercase text-[#FF4D00] mr-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    )
  },
})