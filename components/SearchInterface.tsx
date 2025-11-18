'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import CharacterDetails from './CharacterDetails';
import Loading from './Loading';
import { fetchCharacters } from '@/services/api';
import { Character } from '@/types';

interface SearchInterfaceProps {
  initialResults: Character[];
  initialTotalPages: number;
  initialError: string | null;
  locale: string;
}

export default function SearchInterface({
  initialResults,
  initialTotalPages,
  initialError,
  locale
}: SearchInterfaceProps) {
  const [results, setResults] = useState<Character[]>(initialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details');
  
  useEffect(() => {
    setResults(initialResults);
    setTotalPages(initialTotalPages);
    setCurrentPage(parseInt(page));
    setError(initialError);
  }, [initialResults, initialTotalPages, page, initialError]);

  const handleSearch = async (searchTerm: string, pageNum: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchCharacters(searchTerm, pageNum);
      setResults(response.results);
      setTotalPages(Math.ceil(response.count / 10));
      setCurrentPage(pageNum);

      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        params.set('search', searchTerm);
        params.set('page', pageNum.toString());
      }
      if (details) {
        params.set('details', details);
      }

      router.push(`/${locale}?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    handleSearch(search, page);
  };

  const handleCardClick = (characterUrl: string) => {
    const id = characterUrl.split('/').filter(Boolean).pop();
    
    if (id) {
      const params = new URLSearchParams(searchParams);
      params.set('details', id);
      router.push(`/${locale}?${params.toString()}`);
    }
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    router.push(`/${locale}?${params.toString()}`);
  };

  return (
    <div className={`search-interface ${details ? 'with-details' : ''}`}>
      <div className="search-section">
        <SearchBar 
          onSearch={(term) => handleSearch(term, 1)} 
          initialValue={search}
        />
        
        <div className="results-section">
          {loading && <Loading />}
          
          {error && !loading && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <SearchResults
              results={results}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onCardClick={handleCardClick}
            />
          )}
        </div>
      </div>

      {details && (
        <div className="details-section">
          <CharacterDetails 
            id={details} 
            onClose={handleCloseDetails} 
          />
        </div>
      )}
    </div>
  );
}