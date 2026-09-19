"use client";

import React, { useState } from "react";
import { 
  SlidersHorizontal, 
  ChevronDown, 
  Map, 
  Settings, 
  Check, 
  RotateCcw 
} from "lucide-react";
import { FilterState } from "@/types";

interface FilterBarProps {
  totalCount: number;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  showMap: boolean;
  onToggleMap: () => void;
  onOpenSettings?: () => void;
}

const CAR_TYPES = ["Sedan", "SUV", "Hatchback", "Electric", "Van", "Compact"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];

export function FilterBar({
  totalCount,
  filters,
  onFilterChange,
  showMap,
  onToggleMap,
  onOpenSettings,
}: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleCarTypeToggle = (type: string) => {
    const exists = filters.carTypes.includes(type);
    const newTypes = exists
      ? filters.carTypes.filter((t) => t !== type)
      : [...filters.carTypes, type];
    onFilterChange({ ...filters, carTypes: newTypes });
  };

  const handleFuelTypeToggle = (fuel: string) => {
    const exists = filters.fuelTypes.includes(fuel);
    const newFuels = exists
      ? filters.fuelTypes.filter((f) => f !== fuel)
      : [...filters.fuelTypes, fuel];
    onFilterChange({ ...filters, fuelTypes: newFuels });
  };

  const handlePriceChange = (max: number) => {
    onFilterChange({ ...filters, maxPrice: max });
  };

  const handleResetFilters = () => {
    onFilterChange({
      ...filters,
      carTypes: [],
      fuelTypes: [],
      maxPrice: 50000,
      minPrice: 0,
      searchTerm: "",
      location: "",
    });
    setActiveDropdown(null);
  };

  const allFiltersCount = 
    filters.carTypes.length + 
    filters.fuelTypes.length + 
    (filters.maxPrice < 50000 ? 1 : 0) +
    (filters.searchTerm ? 1 : 0);

  return (
    <div className="relative mb-8" id="listings">
      {/* Top Header Row: Over 3,000 cars & Show Map */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          รถมือสองพร้อมส่งมอบกว่า {totalCount.toLocaleString()} คัน
        </h2>

        <button
          type="button"
          onClick={onToggleMap}
          className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
            showMap
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
          }`}
        >
          <span>{showMap ? "ซ่อนแผนที่" : "ดูบนแผนที่ (Show map)"}</span>
          <Map className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Filter Pills Row */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        
        {/* 1. All filters button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("all")}
            className={`px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${
              activeDropdown === "all" || allFiltersCount > 0
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-900 text-slate-900 bg-white hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>ตัวกรองทั้งหมด</span>
            {allFiltersCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                activeDropdown === "all" || allFiltersCount > 0
                  ? "bg-white text-slate-900"
                  : "bg-slate-900 text-white"
              }`}>
                {allFiltersCount}
              </span>
            )}
          </button>

          {/* All Filters Dropdown Modal */}
          {activeDropdown === "all" && (
            <div className="absolute left-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="font-bold text-slate-900">ตัวกรองทั้งหมด</span>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> ล้างค่าทั้งหมด
                </button>
              </div>

              {/* Price range */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span>งบประมาณราคารถสูงสุด</span>
                  <span className="text-indigo-600 font-bold">${filters.maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Car type */}
              <div className="mb-4">
                <span className="block text-xs font-semibold text-slate-700 mb-2">ประเภทตัวถัง</span>
                <div className="flex flex-wrap gap-1.5">
                  {CAR_TYPES.map((type) => {
                    const selected = filters.carTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleCarTypeToggle(type)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                          selected
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fuel Type */}
              <div className="mb-4">
                <span className="block text-xs font-semibold text-slate-700 mb-2">ระบบเชื้อเพลิง</span>
                <div className="flex flex-wrap gap-1.5">
                  {FUEL_TYPES.map((fuel) => {
                    const selected = filters.fuelTypes.includes(fuel);
                    return (
                      <button
                        key={fuel}
                        type="button"
                        onClick={() => handleFuelTypeToggle(fuel)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                          selected
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {fuel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(null)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full transition shadow-sm"
                >
                  นำตัวกรองไปใช้
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Car type pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("carType")}
            className="px-3.5 py-1.5 rounded-full border border-slate-900 bg-white text-slate-900 text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:bg-slate-50 transition"
          >
            <span>ประเภทรถ (Car type)</span>
            {filters.carTypes.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                {filters.carTypes.length}
              </span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 text-slate-600 transition-transform ${activeDropdown === "carType" ? "rotate-180" : ""}`} />
          </button>

          {activeDropdown === "carType" && (
            <div className="absolute left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="space-y-1">
                {CAR_TYPES.map((type) => {
                  const selected = filters.carTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleCarTypeToggle(type)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl hover:bg-slate-50 text-slate-800 transition"
                    >
                      <span>{type}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. Price range pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("price")}
            className="px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:border-slate-400 hover:bg-slate-50 transition"
          >
            <span>ช่วงราคา (Price range)</span>
            {filters.maxPrice < 50000 && (
              <span className="text-xs font-semibold text-indigo-600">(${filters.maxPrice.toLocaleString()})</span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activeDropdown === "price" ? "rotate-180" : ""}`} />
          </button>

          {activeDropdown === "price" && (
            <div className="absolute left-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-3">
                <span>ราคาสูงสุด:</span>
                <span className="text-indigo-600">${filters.maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>$5,000</span>
                <span>$50,000+</span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Fuel type pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("fuel")}
            className="px-3.5 py-1.5 rounded-full border border-slate-900 bg-white text-slate-900 text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:bg-slate-50 transition"
          >
            <span>เชื้อเพลิง (Fuel type)</span>
            {filters.fuelTypes.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                {filters.fuelTypes.length}
              </span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 text-slate-600 transition-transform ${activeDropdown === "fuel" ? "rotate-180" : ""}`} />
          </button>

          {activeDropdown === "fuel" && (
            <div className="absolute left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="space-y-1">
                {FUEL_TYPES.map((fuel) => {
                  const selected = filters.fuelTypes.includes(fuel);
                  return (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => handleFuelTypeToggle(fuel)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl hover:bg-slate-50 text-slate-800 transition"
                    >
                      <span>{fuel}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Floating Settings Widget on the right edge */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <button
          type="button"
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-xl bg-white shadow-lg border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:scale-105 transition-all"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>

    </div>
  );
}

export default FilterBar;
