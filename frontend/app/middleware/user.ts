import { useSession } from '~/composables/useSession'

export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.client) return
  const { getRole, isLoggedIn } = useSession()
  if (!isLoggedIn()) return navigateTo('/')
  if (getRole() !== 'user') return navigateTo('/admin/dashboard')
})
