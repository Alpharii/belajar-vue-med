import { useLocalStorage } from '@vueuse/core'

export function useAuthenticated() {
  const authCookie = useLocalStorage(import.meta.env.VITE_AUTH_KEY, '')
  let isLogin = false

  if (authCookie.value) {
    isLogin = true
  }

  return {
    isLogin,
  }
}
