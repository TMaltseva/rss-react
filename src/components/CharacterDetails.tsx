import { useState, useEffect } from 'react';
import { useUrlParams } from '../hooks/useUrlParams';
import { fetchCharacterById } from '../services/api';
import { Character } from '../types';
import Loading from './Loading';
import '../styles/components/CharacterDetails.css';

export const CharacterDetails = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { details, updateDetails } = useUrlParams();

  useEffect(() => {
    if (!details) {
      setLoading(false);
      setCharacter(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const loadCharacter = async () => {
      try {
        const data = await fetchCharacterById(details);
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch character');
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [details]);

  const handleClose = () => {
    updateDetails(null);
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;
  if (!character) return null;

  return (
    <div className="character-details">
      <button className="close-button" onClick={handleClose}>
        ×
      </button>
      <h2>{character.name}</h2>
      <div className="details-content">
        <p>Height: {character.height}</p>
        <p>Mass: {character.mass}</p>
        <p>Hair Color: {character.hair_color}</p>
        <p>Skin Color: {character.skin_color}</p>
        <p>Eye Color: {character.eye_color}</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Gender: {character.gender}</p>
        <p>Homeworld: {character.homeworld}</p>
        <h3>Films</h3>
        <ul>
          {character.films.map((film, index) => (
            <li key={index}>{film}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetails;
