import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchData } from '../services/api';
import { Character } from '../types';

export const useSearchWithStorage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = useCallback(
    async (searchTerm: string, page: number) => {
      setLoading(true);
      try {
        const response = await fetchData(searchTerm, page);
        setResults(response.results);
        setTotalPages(Math.ceil(response.count / 10));

        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);
          const details = params.get('details');

          params.delete('search');
          params.delete('page');
          params.delete('details');

          params.set('search', searchTerm);
          params.set('page', page.toString());
          if (details) params.set('details', details);

          return params;
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const currentSearch = searchParams.get('search') || '';
      setCurrentPage(page);

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        const details = params.get('details');
        const search = params.get('search');

        params.delete('search');
        params.delete('page');
        params.delete('details');

        if (search) params.set('search', search);
        params.set('page', page.toString());
        if (details) params.set('details', details);

        return params;
      });

      handleSearch(currentSearch, page);
    },
    [searchParams, handleSearch, setSearchParams]
  );

  return {
    results,
    loading,
    error,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
  };
};
