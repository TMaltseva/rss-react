'use client';

import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('Loading');
  
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{t('loading')}</p>
    </div>
  );
}