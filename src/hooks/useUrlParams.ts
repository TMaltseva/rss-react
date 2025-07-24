import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const details = searchParams.get('details');

  const updateSearch = useCallback(
    (searchTerm: string, newPage: number = 1) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        if (searchTerm.trim()) {
          params.set('search', searchTerm.trim());
          params.set('page', newPage.toString());
        } else {
          params.delete('search');
          params.delete('page');
        }

        return params;
      });
    },
    [setSearchParams]
  );

  const updatePage = useCallback(
    (newPage: number) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        const currentSearch = prev.get('search');

        if (currentSearch) {
          params.set('page', newPage.toString());
        }

        return params;
      });
    },
    [setSearchParams]
  );

  const updateDetails = useCallback(
    (detailsId: string | null) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        if (detailsId) {
          params.set('details', detailsId);
        } else {
          params.delete('details');
        }

        return params;
      });
    },
    [setSearchParams]
  );

  return {
    search,
    page,
    details,
    updateSearch,
    updatePage,
    updateDetails,
  };
};
