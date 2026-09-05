import { createFileRoute } from '@tanstack/react-router'
import { auth } from '#/lib/auth'

export const Route = createFileRoute('/.well-known/agent-configuration')({
  server: {
    handlers: {
      GET: async () => {
        const configuration = await auth.api.getAgentConfiguration()
        return Response.json(configuration)
      },
    },
  },
})
