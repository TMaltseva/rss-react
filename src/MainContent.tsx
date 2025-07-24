import { Outlet } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { useSearch } from './hooks/useSearch';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

const MainContent = () => {
  const {
    results,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    showDetails,
    handleSearch,
    handlePageChange,
    handleDetailsOpen,
    handleDetailsClose,
  } = useSearch();

  return (
    <main className={`sections-wrapper ${showDetails ? 'with-details' : ''}`}>
      <div className="left-section">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />

        <div className="content-section">
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <SearchResults
              results={results}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onCardClick={handleDetailsOpen}
            />
          )}
        </div>
      </div>

      {showDetails && (
        <>
          <div className="close-overlay" onClick={handleDetailsClose} />
          <div className="right-section">
            <Outlet />
          </div>
        </>
      )}
    </main>
  );
};

export default MainContent;
