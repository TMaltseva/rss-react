import { useState } from 'react';
import ErrorButton from './ErrorButton';
import '../styles/components/SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useState(() => {
    setInputValue(initialValue);
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue.trim());
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
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search characters..."
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
