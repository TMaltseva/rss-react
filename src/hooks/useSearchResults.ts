import { useState, useCallback } from 'react';
import { fetchData } from '../services/api';
import { Character } from '../types';

interface SearchState {
  results: Character[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

export const useSearchResults = () => {
  const [state, setState] = useState<SearchState>({
    results: [],
    loading: false,
    error: null,
    totalPages: 1,
  });

  const performSearch = useCallback(async (searchTerm: string, page: number) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetchData(searchTerm, page);

      setState({
        results: response.results,
        totalPages: Math.ceil(response.count / 10),
        loading: false,
        error: response.error || null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        results: [],
      }));
    }
  }, []);

  const clearResults = useCallback(() => {
    setState({
      results: [],
      loading: false,
      error: null,
      totalPages: 1,
    });
  }, []);

  return {
    ...state,
    performSearch,
    clearResults,
  };
};
