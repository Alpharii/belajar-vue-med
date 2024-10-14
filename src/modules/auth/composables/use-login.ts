/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpMethod from '@/modules/common/enums/http-method'
import { createApiFetch } from '@/modules/common/helpers/create-api-fetch'
import { useLocalStorage, type UseFetchOptions } from '@vueuse/core'
import type { Account } from '../types/account'

export async function useLogin(
  _username: string,
  _password: string,
): Promise<Account> {
  const url = '/users/1'
  const fetchOptions: UseFetchOptions = {
    async afterFetch(ctx) {
      const responseData = await ctx.response.json()
      const account: Account = {
        id: responseData.id,
        name: responseData.name,
      }
      ctx.data = account
      return ctx
    },
  }
  const apiFetch = createApiFetch<Account>(
    HttpMethod.GET,
    undefined,
    fetchOptions,
  )
  const { data, error } = await apiFetch(url)
  if (error.value) {
    throw new Error(error.value)
  }

  if (!data.value) {
    throw new Error('account not found')
  }

  if (import.meta.env.VITE_AUTH_KEY) {
    const authLocal = useLocalStorage(import.meta.env.VITE_AUTH_KEY, '')
    authLocal.value = 'Test Example Token'
  }

  return data.value
}
