"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage = 3,
  totalPages = 66,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 py-10 select-none" aria-label="Pagination">
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-700 transition mr-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Page 1 */}
      <button
        type="button"
        onClick={() => onPageChange(1)}
        className={`w-8 h-8 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center transition ${
          currentPage === 1
            ? "bg-slate-100 text-slate-900 shadow-xs"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        1
      </button>

      {/* Page 2 */}
      <button
        type="button"
        onClick={() => onPageChange(2)}
        className={`w-8 h-8 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center transition ${
          currentPage === 2
            ? "bg-slate-100 text-slate-900 shadow-xs"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        2
      </button>

      {/* Page 3 (Active in screenshot) */}
      <button
        type="button"
        onClick={() => onPageChange(3)}
        className={`w-8 h-8 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center transition ${
          currentPage === 3
            ? "bg-slate-100 text-slate-900 shadow-xs"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        3
      </button>

      {/* Ellipsis */}
      <span className="w-8 text-center text-xs text-slate-400 font-bold">...</span>

      {/* Page 65 */}
      <button
        type="button"
        onClick={() => onPageChange(65)}
        className={`w-8 h-8 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center transition ${
          currentPage === 65
            ? "bg-slate-100 text-slate-900 shadow-xs"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        65
      </button>

      {/* Page 66 */}
      <button
        type="button"
        onClick={() => onPageChange(66)}
        className={`w-8 h-8 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center transition ${
          currentPage === 66
            ? "bg-slate-100 text-slate-900 shadow-xs"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        66
      </button>

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-700 transition ml-2"
      >
        <span>Next</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

export default Pagination;
