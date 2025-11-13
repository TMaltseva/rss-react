'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { generateCSV } from '@/app/actions/csv';

export default function CSVExport() {
  const t = useTranslations('CSVExport');
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await generateCSV(search);
      
      const link = document.createElement('a');
      link.href = result.url;
      link.download = `star-wars-${search || 'all'}-${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSuccessMessage(t('success', { count: result.count }));
      
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
      console.error('Export error:', err);
      
      setTimeout(() => setError(null), 10000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="csv-export">
      <button 
        onClick={handleExport}
        disabled={isExporting}
        className="export-button"
      >
        {isExporting ? (
          <>⏳ {t('exporting')}</>
        ) : (
          <>📥 {t('button')}</>
        )}
      </button>
      
      {successMessage && (
        <p className="export-success">{successMessage}</p>
      )}
      
      {error && (
        <p className="export-error">{error}</p>
      )}
    </div>
  );
}