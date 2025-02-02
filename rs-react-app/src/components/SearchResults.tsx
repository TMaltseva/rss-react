import { Component } from 'react';
import { SearchResult } from '../types';

import '../styles/components/SearchResults.css';

interface SearchResultsProps {
  results: SearchResult[];
}

export default class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { results } = this.props;

    if (results.length === 0) {
      return <p>No results found</p>;
    }

    return (
      <div className="results-grid">
        {results.map((result, index) => (
          <div key={index} className="result-card">
            <h3>{result.name}</h3>
            <p>{result.description || 'No description available'}</p>
          </div>
        ))}
      </div>
    );
  }
}
