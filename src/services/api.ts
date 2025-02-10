import { Character } from '../types';

interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
  error?: string;
}

const API_URL = 'https://swapi.dev/api/people';

export const fetchData = async (searchTerm: string, page: number = 1): Promise<APIResponse> => {
  try {
    const url = searchTerm
      ? `${API_URL}/?search=${encodeURIComponent(searchTerm)}&page=${page}`
      : `${API_URL}/?page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error('Resource not found');
        case 500:
          throw new Error('Server error');
        case 0:
          throw new Error('Problem connecting to the server');
        default:
          throw new Error(`Error ${response.status}`);
      }
    }

    return await response.json();
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
