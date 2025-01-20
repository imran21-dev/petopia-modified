import { cn } from "@/lib/utils"; // Utility for conditional class names (if applicable)

export const Paginations = ({ total, currentPage, onPageChange }) => {
  const generatePages = () => {
    const pages = [];
    const delta = 2; // Number of pages to show around the current page

    // Add first page
    if (currentPage > delta + 2) {
      pages.push(1, "...");
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(total - 1, currentPage + delta); i++) {
      pages.push(i);
    }

    // Add last page
    if (currentPage < total - delta - 1) {
      pages.push("...", total);
    } else if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className={cn(
          "px-4 py-2 border rounded-md",
          currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-primary/20"
        )}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-4 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-4 py-2 border rounded-md",
              currentPage === page ? "bg-primary text-white" : "hover:bg-primary/20"
            )}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => currentPage < total && onPageChange(currentPage + 1)}
        className={cn(
          "px-4 py-2 border rounded-md",
          currentPage === total ? "cursor-not-allowed opacity-50" : "hover:bg-primary/20"
        )}
        disabled={currentPage === total}
      >
        Next
      </button>
    </div>
  );
};
