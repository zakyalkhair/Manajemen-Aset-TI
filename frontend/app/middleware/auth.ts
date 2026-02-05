import { useSession } from '~/composables/useSession'

export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.client) return
  const { isLoggedIn } = useSession()
  if (!isLoggedIn()) return navigateTo('/')
})
