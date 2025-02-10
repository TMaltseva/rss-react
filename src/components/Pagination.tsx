import '../styles/components/Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
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
      <button className="pagination-button" onClick={handlePrevious} disabled={currentPage === 1}>
        &larr;
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages}>
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
