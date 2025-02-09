import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Character } from '../types';
import Loading from './Loading';

import '../styles/components/CharacterDetails.css';

interface CharacterDetailsProps {
  onClose?: () => void;
}

export const CharacterDetails = ({ onClose }: CharacterDetailsProps) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        if (!response.ok) throw new Error('Character not found');
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch character');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    navigate('/');
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
