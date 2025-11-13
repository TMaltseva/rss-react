'use client';

import { useRouter, usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => switchLanguage('en')}
        className={currentLocale === 'en' ? 'active' : ''}
        disabled={currentLocale === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('ru')}
        className={currentLocale === 'ru' ? 'active' : ''}
        disabled={currentLocale === 'ru'}
      >
        RU
      </button>
    </div>
  );
}