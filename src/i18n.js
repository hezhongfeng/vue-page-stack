import { createI18n } from 'vue-i18n';

export const SUPPORT_LOCALES = ['en', 'zh'];

import en from './locales/en.json';
import zh from './locales/zh.json';

export function getLocale(i18n) {
  return i18n.mode === 'legacy' ? i18n.global.locale : i18n.global.locale.value;
}

export function setLocale(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
}

export function setupI18n(options = { locale: 'zh' }) {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}

export function setI18nLanguage(i18n, locale) {
  setLocale(i18n, locale);
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', locale);
}

export const i18n = setupI18n({
  legacy: false,
  locale: 'zh',
  // fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
});
