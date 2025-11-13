import { Character, APIResponse } from '@/types';

const API_URL = 'https://swapi.py4e.com/api/people';

export async function fetchCharacters(searchTerm: string = '', page: number = 1): Promise<APIResponse> {
  try {
    const url = searchTerm
      ? `${API_URL}/?search=${encodeURIComponent(searchTerm)}&page=${page}`
      : `${API_URL}/?page=${page}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllCharacters(searchTerm: string): Promise<Character[]> {
  const allCharacters: Character[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const data = await fetchCharacters(searchTerm, page);

      allCharacters.push(...data.results);

      hasMore = data.next !== null;
      page++;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      hasMore = false;
    }
  }

  return allCharacters;
}

export async function fetchCharacterById(id: string): Promise<Character> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
