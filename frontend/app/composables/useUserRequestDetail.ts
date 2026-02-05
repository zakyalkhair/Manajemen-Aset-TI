import { ref } from 'vue'
import { useNuxtApp, useRoute } from '#app'
import type { UserRequestDetail } from '~/types/userRequestDetail'

export const useUserRequestDetail = () => {
  const { get } = useApiData()


  const route = useRoute()

  const loading = ref(true)
  const error = ref<string | null>(null)
  const data = ref<UserRequestDetail | null>(null)
  const loadDetail = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await get<UserRequestDetail>(`/user/request/${route.params.id}`)
    } catch {
      error.value = 'Gagal memuat detail permintaan'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    loadDetail,
  }
}
