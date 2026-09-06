import { createFileRoute } from '@tanstack/react-router'
import { fetchDatoBlogPosts } from '@/lib/datoCms'

export const Route = createFileRoute('/blog')({
  loader: async () => {
    const { posts } = await fetchDatoBlogPosts()
    return { posts }
  },
  component: ({ data }) => {
    const { posts } = data || {}
    return (
      <section className="prose max-w-prose mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post: any, i: number) => (
              <li key={i} className="group hover:text-[#FF4D00] transition-colors">
                <a
                  href={`/blog/${post.attributes?.slug || post.slug || post.id}`}
                  className="block font-medium text-lg leading-tight hover:underline"
                >
                  {post.attributes?.title || post.title || 'Untitled'}
                  {post.attributes?.publishedAt && (
                    <span className="text-xs ml-2 text-muted-foreground">
                      {new Date(post.attributes.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No posts found.</p>
        )}
      </section>
    )
  },
})