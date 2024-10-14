/* eslint-disable @typescript-eslint/no-explicit-any */
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import id from '@/locales/id'

const SUPPORT_LOCALES = ['en', 'id']

const setupI18n = (locale: string = 'id') => {
  const i18n = createI18n({
    legacy: false,
    locale: locale,
    availableLocales: SUPPORT_LOCALES,
    fallbackLocale: 'id',
    messages: {
      en,
      id,
    },
  })
  setI18nLanguage(i18n, locale)
  return i18n
}

const setI18nLanguage = (i18n: any, locale: string) => {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  document.querySelector('html')?.setAttribute('lang', locale)
}

const loadLocaleMessages = async (i18n: any, locale: string) => {
  // load locale messages with dynamic import
  const messages = await import(`./locales/${locale}.ts`)
  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)
  return nextTick()
}

export default {
  setI18nLanguage,
  setupI18n,
  loadLocaleMessages,
}
