/*
  Pagination component is a component that displays a list of pages and allows the user to navigate between them.

  Props:
  - currentPage: the current page number
  - totalPages: the total number of pages
  - onPageChange: a function that is called when the user clicks on a page number
*/

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  if (isLoading) {
    return (
      <div
        className="flex justify-center mt-4 gap-2"
        data-testid="pagination-skeleton"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-4 gap-2" data-testid="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? "bg-primary text-white border-primary"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={idx}
            className="px-2 py-1 text-gray-500 dark:text-gray-400"
          >
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
