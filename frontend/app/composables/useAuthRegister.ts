export const useAuthRegister = () => {
  const { post } = useApiData()
  const router = useRouter()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const loading = ref(false)
  const error = ref('')

  const errors = computed(() => ({
    name: !name.value && error.value ? error.value : '',
    email: !email.value && error.value ? error.value : '',
    password: !password.value && error.value ? error.value : '',
    passwordConfirm:
      password.value !== passwordConfirm.value
        ? 'Konfirmasi password tidak sama'
        : '',
  }))

  const register = async () => {
    error.value = ''

    if (!name.value || !email.value || !password.value) {
      error.value = 'Semua field wajib diisi'
      return
    }

    if (password.value !== passwordConfirm.value) {
      error.value = 'Konfirmasi password tidak sama'
      return
    }

    loading.value = true
    try {
      await post<unknown>('/register', {
        name: name.value,
        email: email.value,
        password: password.value,
      })

      router.push('/')
    } catch (e: any) {
      error.value =
        e?.response?.data?.message || 'Registrasi gagal'
    } finally {
      loading.value = false
    }
  }

  return {
    name,
    email,
    password,
    passwordConfirm,
    loading,
    error,
    errors,
    register,
  }
}
