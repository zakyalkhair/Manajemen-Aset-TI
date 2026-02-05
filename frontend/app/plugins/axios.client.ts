import axios from 'axios'
import { useSession } from '~/composables/useSession'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { getToken, clearSession } = useSession()

  const api = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      Accept: 'application/json',
    },
  })

  api.interceptors.request.use((cfg) => {
    if (import.meta.client) {
      const token = getToken()
      if (token) {
        cfg.headers.Authorization = `Bearer ${token}`
      }
    }
    return cfg
  })

  api.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response?.status === 401 && import.meta.client) {
        clearSession()
        navigateTo('/')
      }
      return Promise.reject(err)
    }
  )

  return {
    provide: { api },
  }
})
