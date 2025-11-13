import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');
  
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      
      <Link href="/" className="home-link">
        {t('goHome')}
      </Link>
    </div>
  );
}