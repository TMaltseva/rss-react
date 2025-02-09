import { useState, useEffect } from 'react';
import ErrorButton from './ErrorButton';

import '../styles/components/SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(savedTerm);
    if (savedTerm) {
      onSearch(savedTerm);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    onSearch(trimmedTerm);
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
