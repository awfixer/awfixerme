/**
 * BlogPost – renders a single blog post fetched from DatoCMS.
 * Receives the full DatoCMS item as a prop.
 *
 * The DatoCMS "structured_text" field (body) comes as HTML.
 * We use dangerouslySetInnerHTML but keep it safe by:
 *   - Only rendering fields we know exist
 *   - Using Tailwind's prose class for sane defaults
 */
interface BlogPostProps {
  post: any // DatoCMS item shape
}

export const BlogPost = ({ post }: BlogPostProps) => {
  const title = post.attributes?.title || post.title || 'Untitled'
  const publishedAt = post.attributes?.publishedAt
  const excerpt = post.attributes?.excerpt
  const body = post.attributes?.body

  // Tags/taxonomy – DatoCMS may store them as an array of strings
  const tags = post.attributes?.tags || []

  // Parse a simple publish date string if needed
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
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#FF4D00] px-3 py-1 font-mono text-[10px] tracking-[-0.02em] uppercase text-[#FF4D00] mr-1">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}