'use client';

import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  const t = useTranslations('Pagination');

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        className="pagination-button"
        aria-label={t('previous')}
      >
        ← {t('previous')}
      </button>
      
      <span className="page-info">
        {t('page', { current: currentPage, total: totalPages })}
      </span>
      
      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        className="pagination-button"
        aria-label={t('next')}
      >
        {t('next')} →
      </button>
    </div>
  );
}