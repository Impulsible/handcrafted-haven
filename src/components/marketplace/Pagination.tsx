import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  showItemsInfo?: boolean;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
  showItemsInfo = true,
  siblingCount = 1,
}: PaginationProps) {
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3; // siblings + first + last + current + 2*ellipsis
    const totalBlocks = totalNumbers + 2; // with ellipsis

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
      const pages: (number | 'ellipsis')[] = [1];

      // Left ellipsis
      if (startPage > 2) {
        pages.push('ellipsis');
      }

      // Middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Right ellipsis
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }

      // Last page
      pages.push(totalPages);

      return pages;
    }

    // If fewer pages than totalBlocks, show all pages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

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

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Items Info */}
      {showItemsInfo && (
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{startItem}</span> to{' '}
          <span className="font-semibold">{endItem}</span> of{' '}
          <span className="font-semibold">{totalItems.toLocaleString()}</span> products
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="w-9 h-9"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === 'ellipsis') {
            return (
              <Button
                key={`ellipsis-${index}`}
                variant="outline"
                size="icon"
                disabled
                className="w-9 h-9"
                aria-label="More pages"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            );
          }

          const isCurrent = pageNumber === currentPage;
          
          return (
            <Button
              key={pageNumber}
              variant={isCurrent ? 'default' : 'outline'}
              size="icon"
              onClick={() => onPageChange(pageNumber as number)}
              className={`w-9 h-9 ${isCurrent ? '' : 'hover:bg-gray-100'}`}
              aria-label={`Page ${pageNumber}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {pageNumber}
            </Button>
          );
        })}

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-9 h-9"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Page Jump (Optional) */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Go to page:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const page = parseInt(e.target.value);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
              onPageChange(page);
            }
          }}
          className="w-16 px-2 py-1 border rounded text-center"
          aria-label="Go to page number"
        />
        <span className="text-gray-500">of {totalPages}</span>
      </div>
    </div>
  );
}

