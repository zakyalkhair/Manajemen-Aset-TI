import { useSession } from '~/composables/useSession'

export const useAuthLogout = () => {
  const { post } = useApiData()
  const router = useRouter()
  const { clearSession } = useSession()

  const logout = async () => {
    try {
      await post<null>('/logout')
    } finally {
      clearSession()
      router.push('/')
    }
  }

  return {
    logout,
  }
}
