import { useEffect } from 'react';
import { useUrlParams } from './useUrlParams';
import { useSearchResults } from './useSearchResults';

export const useSearch = () => {
  const { search, page, details, updateSearch, updatePage, updateDetails } = useUrlParams();
  const { results, loading, error, totalPages, performSearch, clearResults } = useSearchResults();

  useEffect(() => {
    if (search) {
      performSearch(search, page);
    } else {
      clearResults();
    }
  }, [search, page, performSearch, clearResults]);

  const handleSearch = (searchTerm: string) => {
    updateSearch(searchTerm, 1);
  };

  const handlePageChange = (newPage: number) => {
    updatePage(newPage);
  };

  const handleDetailsOpen = (characterUrl: string) => {
    const id = characterUrl.split('/').filter(Boolean).pop();
    if (id) {
      updateDetails(id);
    }
  };

  const handleDetailsClose = () => {
    updateDetails(null);
  };

  return {
    results,
    loading,
    error,
    currentPage: page,
    totalPages,
    searchTerm: search,
    showDetails: !!details,

    handleSearch,
    handlePageChange,
    handleDetailsOpen,
    handleDetailsClose,
  };
};
