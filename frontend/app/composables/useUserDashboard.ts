import type { UserRequestSummary } from '~/types/userRequest'

export const useUserDashboard = () => {
  const { get } = useApiData()

  const requests = ref<UserRequestSummary[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadDashboard = async () => {
    loading.value = true
    error.value = null

    try {
      requests.value = await get<UserRequestSummary[]>('/user/dashboard')
    } catch (e) {
      console.error('Gagal load dashboard', e)
      error.value = 'Gagal memuat dashboard'
    } finally {
      loading.value = false
    }
  }

  return {
    requests,
    loading,
    error,
    loadDashboard,
  }
}
