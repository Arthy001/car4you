"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 py-10 select-none" aria-label="Pagination">
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => {
          onPageChange(currentPage - 1);
          document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition mr-1 sm:mr-2 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${idx}`} className="w-8 text-center text-xs text-slate-400 font-bold">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={`page-${pageNum}`}
            type="button"
            onClick={() => {
              onPageChange(pageNum);
              document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-8 h-8 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center transition cursor-pointer ${
              isActive
                ? "bg-slate-100 text-slate-900 shadow-xs font-bold ring-1 ring-slate-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => {
          onPageChange(currentPage + 1);
          document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition ml-1 sm:ml-2 cursor-pointer"
      >
        <span>Next</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

export default Pagination;
