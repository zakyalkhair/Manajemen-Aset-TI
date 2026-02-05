import type { UserProfile } from "~/types/user"

export const useAdminProfile = () => {
  const { get } = useApiData()
  const { logout } = useAuthLogout()

  const profile = ref<UserProfile | null>(null)
  const error = ref<string | null>(null)

  const loadProfile = async () => {
    try {
      error.value = null
      profile.value = await get<UserProfile>("/admin/profile")
    } catch (e) {
      console.error("Gagal load profile admin", e)
      error.value = "Gagal memuat profile"
    }
  }

  return {
    profile,
    error,
    loadProfile,
    logout,
  }
}
