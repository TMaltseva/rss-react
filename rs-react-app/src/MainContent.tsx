import { useSearchParams, Outlet } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { useSearchWithStorage } from './hooks/useSearchWithStorage';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

const MainContent = () => {
  const { results, loading, error, currentPage, totalPages, handleSearch, handlePageChange } = useSearchWithStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const showDetails = searchParams.has('details');

  const handleLeftSectionClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.result-card')) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        const search = params.get('search');
        const page = params.get('page');

        params.delete('search');
        params.delete('page');
        params.delete('details');

        if (search) params.set('search', search);
        if (page) params.set('page', page);

        return params;
      });
    }
  };

  return (
    <main className={`sections-wrapper ${showDetails ? 'with-details' : ''}`}>
      <div className="left-section" onClick={handleLeftSectionClick}>
        <SearchBar onSearch={handleSearch} />
        <div className="content-section">
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <SearchResults
              results={results}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {showDetails && (
        <div className="right-section">
          <Outlet />
        </div>
      )}
    </main>
  );
};

export default MainContent;
