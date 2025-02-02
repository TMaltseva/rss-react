import { Component } from 'react';
import '../styles/components/SearchBar.css';
import ThrowErrorButton from './ErrorButton';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onError: () => void;
}

interface SearchBarState {
  searchTerm: string;
}

export default class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.props.onSearch(trimmedTerm);
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search..."
          aria-label="Search input"
        />
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>
        <ThrowErrorButton onError={this.props.onError} />
      </div>
    );
  }
}
