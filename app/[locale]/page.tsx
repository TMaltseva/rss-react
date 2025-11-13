import { getTranslations } from 'next-intl/server';
import SearchInterface from '@/components/SearchInterface';
import { fetchCharacters } from '@/services/api';
import { Character } from '@/types';

interface PageProps {
  params: { locale: string };
  searchParams: { 
    search?: string; 
    page?: string; 
    details?: string;
  };
}

interface InitialData {
  results: Character[];
  totalPages: number;
  error: string | null;
}

export async function generateMetadata({ searchParams }: PageProps) {
    const t = await getTranslations('HomePage');
    const { search } = searchParams;
    
    return {
      title: search ? `${search} - ${t('title')}` : t('title'),
      description: t('description'),
    };
  }

export default async function HomePage({ params, searchParams }: PageProps) {
    const t = await getTranslations('HomePage');
    const { search, page } = searchParams;
    
    let initialData: InitialData = {
      results: [],
      totalPages: 0,
      error: null,
    };
  
    if (search) {
      try {
        const response = await fetchCharacters(search, parseInt(page || '1'));
        initialData = {
          results: response.results,
          totalPages: Math.ceil(response.count / 10),
          error: null,
        };
      } catch (error) {
        initialData.error = error instanceof Error ? error.message : 'Unknown error';
      }
    }
  
    return (
      <div className="page-container">
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        
        <SearchInterface 
          initialResults={initialData.results}
          initialTotalPages={initialData.totalPages}
          initialError={initialData.error}
          locale={params.locale}
        />
      </div>
    );
  }
