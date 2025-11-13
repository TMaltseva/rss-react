'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { fetchAllCharacters } from '@/services/api';

export async function generateCSV(searchTerm: string = '') {
  const characters = await fetchAllCharacters(searchTerm);

  if (characters.length === 0) {
    throw new Error('No characters to export');
  }

  const csvHeader = 'Name,Height,Mass,Hair Color,Skin Color,Eye Color,Birth Year,Gender\n';

  const csvContent = characters
    .map(
      (character) =>
        `"${character.name}","${character.height}","${character.mass}","${character.hair_color}","${character.skin_color}","${character.eye_color}","${character.birth_year}","${character.gender}"`
    )
    .join('\n');

  const csv = csvHeader + csvContent;

  try {
    const publicDir = join(process.cwd(), 'public');
    const fileName = `characters-${Date.now()}.csv`;
    const filePath = join(publicDir, fileName);

    await mkdir(publicDir, { recursive: true });
    await writeFile(filePath, csv, 'utf-8');

    return {
      url: `/${fileName}`,
      count: characters.length,
    };
  } catch (error) {
    console.error('Error generating CSV:', error);
    throw new Error('Failed to generate CSV file');
  }
}
