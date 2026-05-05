import { createFileRoute } from '@tanstack/react-router'
import PublicSite from '@/components/cms/PublicSite'

export const Route = createFileRoute('/')({
  component: PublicSite,
})
