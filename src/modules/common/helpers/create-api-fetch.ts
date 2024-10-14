import type HttpMethod from '@/modules/common/enums/http-method'
import {
  createFetch,
  useFetch,
  useLocalStorage,
  type UseFetchOptions,
} from '@vueuse/core'

export function createApiFetch<T>(
  method: HttpMethod,
  fetchOption?: RequestInit,
  options?: UseFetchOptions,
): typeof useFetch<T> {
  const authToken = useLocalStorage(import.meta.env.VITE_AUTH_KEY, '').value
  const requestOptions: RequestInit = {
    method: method,
    headers:
      authToken.length > 0
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : {},
    ...fetchOption,
  }

  return createFetch({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    options: options,
    fetchOptions: requestOptions,
  })
}
