import { createFileRoute } from '@tanstack/react-router'
import AdminDashboard from '@/components/cms/AdminDashboard'

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
})
