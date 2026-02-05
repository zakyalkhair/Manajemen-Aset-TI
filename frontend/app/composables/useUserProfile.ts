import type { UserProfile } from '~/types/user'

export const useUserProfile = () => {
  const { get } = useApiData()
  const { logout: authLogout } = useAuthLogout()

  const loading = ref(true)
  const error = ref<string | null>(null)
  const user = ref<UserProfile | null>(null)

  const loadProfile = async () => {
    loading.value = true
    error.value = null
    try {
      user.value = await get<UserProfile>('/user/profile')
    } catch {
      error.value = "Gagal memuat profile"
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await authLogout()
  }

  return {
    loading,
    error,
    user,
    loadProfile,
    logout,
  }
}
