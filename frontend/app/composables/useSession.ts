export const useSession = () => {
  const setSession = (token: string, user: any) => {
    if (!import.meta.client) return
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const clearSession = () => {
    if (!import.meta.client) return
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const getToken = () => {
    if (!import.meta.client) return null
    return localStorage.getItem('token')
  }

  const getUser = () => {
    if (!import.meta.client) return null
    const raw = localStorage.getItem('user')
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  }

  const getRole = () => {
    const user = getUser()
    return user?.role || null
  }

  const isLoggedIn = () => {
    return !!getToken()
  }

  return {
    setSession,
    clearSession,
    getToken,
    getUser,
    getRole,
    isLoggedIn,
  }
}
