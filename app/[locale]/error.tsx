'use client';

import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ErrorMessage');

  return (
    <div className="error-container">
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}