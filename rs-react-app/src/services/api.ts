import { Character } from '../types';

interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
  error?: string;
}

const API_URL = 'https://swapi.dev/api/people';

export const fetchData = async (searchTerm: string): Promise<APIResponse> => {
  try {
    const url = searchTerm ? `${API_URL}/?search=${encodeURIComponent(searchTerm)}` : API_URL;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
