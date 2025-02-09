import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useSearchParams, Outlet } from 'react-router-dom';
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

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const page = searchParams.get('page') || '1';
    setCurrentPage(Number(page));
    handleSearch(savedSearchTerm);
  }, [searchParams]);

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchData(searchTerm);

      if (response.error) {
        setError(response.error);
        setResults([]);
      } else {
        setResults(response.results);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    setCurrentPage(page);
  };

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

const MainLayout = () => {
  const { results, loading, error, currentPage, handleSearch, handlePageChange, itemsPerPage } = useSearchWithStorage();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="sections-wrapper">
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
      <div className="right-section">
        <Outlet />
      </div>
    </main>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="character/:id" element={<CharacterDetails />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default App;
