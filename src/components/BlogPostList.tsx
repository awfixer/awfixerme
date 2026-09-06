/**
 * BlogPostList – renders a list of blog posts fetched from DatoCMS.
 * Receives the raw DatoCMS item array via props.
 */
export const BlogPostList = ({ posts }: { posts: any }) => {
  // Transform each DatoCMS item into a simple link preview
  const formatted = posts.map((post: any) => {
    const title = post.attributes?.title || post.title || 'Untitled'
    const slug = post.attributes?.slug || post.slug || post.id
    const publishedAt = post.attributes?.publishedAt
      ? new Date(post.attributes.publishedAt).toLocaleDateString()
      : undefined

    return {
      title,
      slug,
      publishedAt,
    }
  })

  return (
    <ul className="space-y-4">
      {formatted.map((post, i) => (
        <li
          key={post.title + i}
          className="group hover:text-[#FF4D00] transition-colors"
        >
          <a
            href={`/blog/${post.slug}`}
            className="block font-medium text-lg leading-tight hover:underline"
          >
            {post.title}
            {post.publishedAt && (
              <span className="text-xs ml-2 text-muted-foreground">
                {post.publishedAt}
              </span>
            )}
          </a>
        </li>
      ))}
      {formatted.length === 0 && (
        <li className="text-muted-foreground">No posts found.</li>
      )}
    </ul>
  )
}
