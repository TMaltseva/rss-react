import { getRequestConfig } from 'next-intl/server';
import { routing } from './navigation';

type Locale = (typeof routing.locales)[number]; // 'en' | 'ru'

function isValidLocale(locale: string | undefined): locale is Locale {
  return locale !== undefined && routing.locales.includes(locale as Locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
