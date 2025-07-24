import { Character } from '../types';
import Pagination from './Pagination';
import '../styles/components/SearchResults.css';

interface SearchResultsProps {
  results: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCardClick: (characterUrl: string) => void;
}

const SearchResults = ({ results, currentPage, totalPages, onPageChange, onCardClick }: SearchResultsProps) => {
  const handleCardClick = (characterUrl: string) => {
    // e.stopPropagation();
    onCardClick(characterUrl);
  };

  if (!results || results.length === 0) {
    return (
      <div className="no-results">
        <p>No results found</p>
      </div>
    );
  }

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
