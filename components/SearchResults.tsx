'use client';

import { useTranslations } from 'next-intl';
import { Character } from '@/types';
import Pagination from './Pagination';
import CSVExport from './CSVExport';

interface SearchResultsProps {
  results: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCardClick: (characterUrl: string) => void;
}

export default function SearchResults({ 
  results, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onCardClick 
}: SearchResultsProps) {
  const t = useTranslations('SearchResults');

  if (results.length === 0) {
    return (
      <div className="no-results">
        <p>{t('noResults')}</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <CSVExport />
      <div className="results-grid">
        {results.map((character) => (
          <div 
            key={character.url}
            className="character-card" 
            onClick={() => onCardClick(character.url)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onCardClick(character.url);
              }
            }}
          >
            <h3>{character.name}</h3>
            <div className="character-info">
              <p><strong>{t('height')}:</strong> {character.height}</p>
              <p><strong>{t('mass')}:</strong> {character.mass}</p>
              <p><strong>{t('hairColor')}:</strong> {character.hair_color}</p>
              <p><strong>{t('eyeColor')}:</strong> {character.eye_color}</p>
              <p><strong>{t('birthYear')}:</strong> {character.birth_year}</p>
              <p><strong>{t('gender')}:</strong> {character.gender}</p>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      )}
    </div>
  );
}