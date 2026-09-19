"use client";

import React from "react";
import { Car } from "@/types";
import { CarCard } from "./CarCard";
import { Car as CarIcon, RotateCcw } from "lucide-react";

interface CarGridProps {
  cars: Car[];
  favorites: string[];
  onToggleFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onResetFilters: () => void;
}

export function CarGrid({
  cars,
  favorites,
  onToggleFavorite,
  onSelectCar,
  onResetFilters,
}: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="py-20 text-center bg-slate-50/60 rounded-3xl border border-dashed border-slate-200 my-8">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <CarIcon className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No cars found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          We couldn&apos;t find any vehicles matching your current filter criteria. Try adjusting your filters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-5 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition inline-flex items-center gap-2 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset all filters</span>
        </button>
      </div>
    );
  }

  return (
    // 2-column responsive layout matching screenshot template
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isFavorite={favorites.includes(car.id)}
          onToggleFavorite={onToggleFavorite}
          onSelectCar={onSelectCar}
        />
      ))}
    </div>
  );
}

export default CarGrid;
