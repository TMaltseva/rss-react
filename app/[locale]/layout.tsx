import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

import '../globals.css';
import '@/styles/components/LanguageSwitcher.css';
import '@/styles/components/SearchInterface.css';
import '@/styles/components/SearchBar.css';
import '@/styles/components/SearchResults.css';
import '@/styles/components/Pagination.css';
import '@/styles/components/CharacterDetails.css';
import '@/styles/components/CSVExport.css';
import '@/styles/components/Loading.css';

export const metadata: Metadata = {
  title: 'Star Wars Characters Search',
  description: 'Search and explore Star Wars characters',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

type Locale = (typeof routing.locales)[number];

function isValidLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale);
}

export default async function LocaleLayout({ 
  children, 
  params: { locale } 
}: LocaleLayoutProps) {
  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="app-container">
            <LanguageSwitcher currentLocale={locale} />
            <main>{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html> 
  );
}