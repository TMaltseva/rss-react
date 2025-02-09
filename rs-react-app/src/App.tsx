import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import CharacterDetails from './components/CharacterDetails';
import { fetchData } from './services/api';
import { Character } from './types';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import NotFound from './components/NotFound';

import './styles/index.css';

const useSearchWithStorage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = useCallback(
    async (searchTerm: string, page: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchData(searchTerm);

        if (response.error) {
          setError(response.error);
          setResults([]);
        } else {
          setResults(response.results);
          setSearchParams({
            search: searchTerm,
            page: page.toString(),
          });
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const page = Number(searchParams.get('page')) || 1;
    const currentSearch = searchParams.get('search') || savedSearchTerm;

    setCurrentPage(page);
    if (currentSearch) {
      handleSearch(currentSearch, page);
    }
  }, [handleSearch]);

  const handlePageChange = useCallback(
    (page: number) => {
      const currentSearch = searchParams.get('search') || '';
      setCurrentPage(page);
      setSearchParams({
        search: currentSearch,
        page: page.toString(),
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
    handleSearch,
    handlePageChange,
    itemsPerPage,
  };
};
const MainContent = ({ showDetails = false }: { showDetails?: boolean }) => {
  const { results, loading, error, currentPage, handleSearch, handlePageChange, itemsPerPage } = useSearchWithStorage();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className={`sections-wrapper ${showDetails ? 'with-details' : ''}`}>
      <div className="left-section">
        <SearchBar onSearch={handleSearch} />
        <div className="content-section">
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <SearchResults
              results={paginatedResults}
              currentPage={currentPage}
              totalPages={Math.ceil(results.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      {showDetails && (
        <div className="right-section">
          <CharacterDetails />
        </div>
      )}
    </main>
  );
};

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainContent />} />
    <Route path="/character/:id" element={<MainContent showDetails={true} />} />
    <Route path="/404" element={<NotFound />} />
    <Route path="" element={<Navigate to="/" replace />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);

export default App;
