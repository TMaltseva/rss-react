import { useState, useEffect } from 'react';
import ErrorButton from './ErrorButton';
import '../styles/components/SearchBar.css';

const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

interface SearchBarProps {
  onSearch: (term: string, page: number) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useSearchTerm();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    onSearch(trimmedTerm, 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        aria-label="Search input"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      <ErrorButton />
    </div>
  );
};

export default SearchBar;
