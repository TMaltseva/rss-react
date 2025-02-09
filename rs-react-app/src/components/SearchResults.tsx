import { useNavigate } from 'react-router-dom';
import { Character } from '../types';
import Pagination from './Pagination';

import '../styles/components/SearchResults.css';

interface SearchResultsProps {
  results: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SearchResults = ({ results, currentPage, totalPages, onPageChange }: SearchResultsProps) => {
  const navigate = useNavigate();

  if (results.length === 0) {
    return (
      <div className="no-results">
        <p>No results found</p>
      </div>
    );
  }

  const handleCardClick = (characterUrl: string) => {
    const id = characterUrl.split('/').filter(Boolean).pop();
    navigate(`/character/${id}`);
  };

  return (
    <>
      <div className="results-grid">
        {results.map((result, index) => (
          <div key={index} className="result-card" onClick={() => handleCardClick(result.url)}>
            <h3>{result.name}</h3>
            <p>Height: {result.height}</p>
            <p>Mass: {result.mass}</p>
            <p>Hair Color: {result.hair_color}</p>
            <p>Skin Color: {result.skin_color}</p>
            <p>Eye Color: {result.eye_color}</p>
            <p>Birth Year: {result.birth_year}</p>
            <p>Gender: {result.gender}</p>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
};

export default SearchResults;
