import { Component } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ThrowErrorButton from './components/ErrorButton';
import { fetchData } from './services/api';
import { Character } from './types';

import './styles/index.css';

interface AppState {
  results: Character[];
  loading: boolean;
  error: string | null;
}

export default class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.handleSearch(savedSearchTerm);
  }

  handleSearch = async (searchTerm: string): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetchData(searchTerm);

      if (response.error) {
        this.setState({
          error: response.error,
          loading: false,
          results: [],
        });
        return;
      }

      this.setState({
        results: response.results,
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        loading: false,
        results: [],
      });
    }
  };

  render(): React.ReactNode {
    const { results, loading, error } = this.state;

    return (
      <main className="sections-wrapper">
        <div className="top-section">
          <SearchBar onSearch={this.handleSearch} />
          <ThrowErrorButton
            onError={() => {
              throw new Error('Test error thrown');
            }}
          />
        </div>
        <div className="bottom-section">
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && <SearchResults results={results} />}
        </div>
      </main>
    );
  }
}
