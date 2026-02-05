import { useSession } from '~/composables/useSession'
import type { UserProfile } from '~/types/user'

export const useAuthLogin = () => {
  const { post } = useApiData()
  const router = useRouter()
  const { setSession } = useSession()

  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')

  const errors = reactive({
    email: '',
    password: '',
  })

  const validate = () => {
    errors.email = ''
    errors.password = ''
    error.value = ''

    if (!email.value) errors.email = 'Email wajib diisi'
    if (!password.value) errors.password = 'Password wajib diisi'

    return !errors.email && !errors.password
  }

  const login = async () => {
    if (!validate()) return

    loading.value = true
    try {
      const data = await post<{ token: string; user: UserProfile }>('/login', {
        email: email.value,
        password: password.value,
      })

      const token = data?.token
      const user = data?.user

      if (!token || !user) {
        throw new Error('Response login tidak valid')
      }

      setSession(token, user)

      router.push(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard')
    } catch (e: any) {
      error.value = e?.response?.data?.message || e?.message || 'Login gagal'
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    password,
    loading,
    error,
    errors,
    login,
  }
}
