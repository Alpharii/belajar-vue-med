// @vitest-environment jsdom
import createFetchMock from 'vitest-fetch-mock'
import { it, vi, expect, describe, beforeAll } from 'vitest'
import type { Account } from '@/modules/auth/types/account'
import { mount } from '@vue/test-utils'
import Login from '@/pages/login/index.vue'
import i18n from '@/i18n'
import { createTestingPinia } from '@pinia/testing'
import { useStyle } from 'primevue/usestyle'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import routes from '@/router'
import { sleep } from '~/helpers/sleep'
import consoleError from '~/helpers/error'
import HttpMethod from '@/modules/common/enums/http-method'

console.error = consoleError
const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

describe('Login Page Test', () => {
  beforeAll(() => {
    fetchMocker.resetMocks()
    const mockAccount: Account = {
      id: '10',
      name: 'vani ardiansyah',
    }
    fetchMocker.mockResponseOnce(JSON.stringify(mockAccount))
  })

  it('should success login and navigate to home', async () => {
    const i18nInstance = i18n.setupI18n('en')
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    })

    const wrapper = mount(Login, {
      global: {
        components: {
          useStyle,
          InputText,
          PrimeButton: Button,
        },
        plugins: [PrimeVue, i18nInstance, pinia, routes],
      },
    })
    const push = vi.spyOn(routes, 'push')

    const usernameInput = wrapper.find('[data-test="usernameInput"]')
    const passwordInput = wrapper.find('[data-test="passwordInput"]')

    await usernameInput.setValue('user-test')
    await passwordInput.setValue('user-password')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.username).toBe('user-test')
    expect(wrapper.vm.password).toBe('user-password')

    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    await sleep(1000)

    // assert navigation call
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/home')

    // assert use login request
    expect(fetchMocker.requests().length).toEqual(1)
    expect(fetchMocker.requests()[0].method).toEqual(HttpMethod.GET)
    expect(fetchMocker.requests()[0].url).toEqual(
      'https://6567421164fcff8d73100cfa.mockapi.io/api/v1/users/1',
    )
    wrapper.unmount()
  })
})
