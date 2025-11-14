'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('SearchBar');

  const handleSearch = () => {
    startTransition(() => {
      onSearch(inputValue.trim());
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('placeholder')}
        disabled={isPending}
      />
      <button 
        className="search-button" 
        onClick={handleSearch}
        disabled={isPending}
      >
        {isPending ? t('searching') : t('search')}
      </button>
    </div>
  );
}