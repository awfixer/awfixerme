import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: () => {
    return (
      <section className="prose max-w-prose mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p>Blog posts will appear here once connected to DatoCMS.</p>
        <ul>
          <li>Post 1: Title goes here</li>
          <li>Post 2: Another title</li>
          <li>Post 3: Yet another title</li>
        </ul>
      </section>
    )
  },
})