import { createFileRoute } from '@tanstack/react-router'
import AwfixerPage from '../components/awfixer/AwfixerPage'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      {
        title:
          'AWFixer — Founder, iResolved LLC | Solved, Chained Tools, Bobs Computer',
      },
      {
        name: 'description',
        content:
          'AWFixer, founder of iResolved LLC. Building Solved Corp && Solved Labs, Chained Tools, and Bobs Computer. Tinkerer, stroke victim, autistic, proud American, red-blooded capitalist.',
      },
    ],
  }),
})

function Home() {
  return <AwfixerPage />
}
