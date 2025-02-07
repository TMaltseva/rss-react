import { Component } from 'react';
import { Character } from '../types';

import '../styles/components/SearchResults.css';

interface SearchResultsProps {
  results: Character[];
}

export default class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { results } = this.props;

    if (results.length === 0) {
      return (
        <div className="no-results">
          <p>No results found</p>
        </div>
      );
    }

    return (
      <div className="results-grid">
        {results.map((result, index) => (
          <div key={index} className="result-card">
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
    );
  }
}
