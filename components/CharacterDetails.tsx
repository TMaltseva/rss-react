'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { fetchCharacterById } from '@/services/api';
import { Character } from '@/types';
import Loading from './Loading';

interface CharacterDetailsProps {
  id: string;
  onClose: () => void;
}

export default function CharacterDetails({ id, onClose }: CharacterDetailsProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const t = useTranslations('CharacterDetails');

  useEffect(() => {
    const loadCharacter = async () => {
      setLoading(true);
      setError(null);
      setImageError(false);
      
      try {
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load character');
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [id]);

  const getCharacterImage = () => {
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <>
        <div className="character-details-backdrop" onClick={onClose} />
        <div className="character-details">
          <Loading />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="character-details-backdrop" onClick={onClose} />
        <div className="character-details">
          <button className="close-button" onClick={onClose} aria-label={t('close')}>
            ✕
          </button>
          <div className="error-state">
            <p>{error}</p>
          </div>
        </div>
      </>
    );
  }

  if (!character) return null;

  return (
    <>
      <div className="character-details-backdrop" onClick={onClose} />
      <div className="character-details">
        <button className="close-button" onClick={onClose} aria-label={t('close')}>
          ✕
        </button>
        
        <div className="character-header">
          <div className="character-avatar">
            {!imageError ? (
              <img
                src={getCharacterImage()}
                alt={character.name}
                className="character-image"
                onError={handleImageError}
              />
            ) : (
              <div className="avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            )}
          </div>
          <h2>{character.name}</h2>
        </div>
        
        <div className="character-details-content">
          <section className="details-section">
            <h3>{t('physicalCharacteristics')}</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">{t('height')}:</span>
                <span className="detail-value">{character.height} cm</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('mass')}:</span>
                <span className="detail-value">{character.mass} kg</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('hairColor')}:</span>
                <span className="detail-value">{character.hair_color}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('skinColor')}:</span>
                <span className="detail-value">{character.skin_color}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('eyeColor')}:</span>
                <span className="detail-value">{character.eye_color}</span>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h3>{t('generalInformation')}</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">{t('birthYear')}:</span>
                <span className="detail-value">{character.birth_year}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('gender')}:</span>
                <span className="detail-value">{character.gender}</span>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h3>{t('films')}</h3>
            <div className="films-count">
              {character.films.length} {character.films.length === 1 ? 'film' : 'films'}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}