"use client";

import React, { useState } from "react";
import { MapPin, X, Navigation, Layers, Car as CarIcon, Star } from "lucide-react";
import { Car } from "@/types";

interface MapViewProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  onClose?: () => void;
}

export function MapView({ cars, onSelectCar, onClose }: MapViewProps) {
  const [selectedPin, setSelectedPin] = useState<Car | null>(null);

  // Mock map coordinates generator for display
  const pinPositions = [
    { top: "25%", left: "30%" },
    { top: "35%", left: "65%" },
    { top: "50%", left: "20%" },
    { top: "55%", left: "55%" },
    { top: "65%", left: "80%" },
    { top: "75%", left: "40%" },
    { top: "40%", left: "45%" },
    { top: "20%", left: "75%" },
  ];

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border border-slate-200 shadow-lg mb-8 bg-slate-100">
      {/* Stylized Map Grid Canvas Background */}
      <div className="absolute inset-0 bg-[#E5E9EC] opacity-90">
        {/* Road & River SVG styling */}
        <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D3D9DE" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#EBF0F3" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Main roads */}
          <path d="M -50 200 Q 300 150 600 300 T 1200 250" fill="none" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" />
          <path d="M 400 -50 Q 450 300 500 700" fill="none" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
          <path d="M 100 600 Q 500 400 900 600" fill="none" stroke="#FFFFFF" strokeWidth="16" />
          {/* Waterway */}
          <path d="M -20 100 C 200 120, 350 80, 500 140 C 700 220, 900 180, 1200 200" fill="none" stroke="#C3DAFE" strokeWidth="32" strokeLinecap="round" opacity="0.8" />
        </svg>
      </div>

      {/* Map Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-xs font-bold text-slate-800 flex items-center gap-2 pointer-events-auto border border-slate-100">
          <Navigation className="w-3.5 h-3.5 text-indigo-600" />
          <span>Showing {cars.length} cars in current area</span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition pointer-events-auto"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Interactive Car Pins */}
      {cars.slice(0, 8).map((car, index) => {
        const pos = pinPositions[index % pinPositions.length];
        const isHovered = selectedPin?.id === car.id;

        return (
          <div
            key={car.id}
            style={{ top: pos.top, left: pos.left }}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 group"
            onClick={() => setSelectedPin(car)}
          >
            {/* Price Pill Pin */}
            <div className={`px-3 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1 transition-all ${
              isHovered
                ? "bg-indigo-600 text-white scale-110 ring-4 ring-indigo-200"
                : "bg-white text-slate-900 hover:bg-slate-900 hover:text-white border border-slate-200"
            }`}>
              <CarIcon className="w-3 h-3" />
              <span>${car.price_per_day}</span>
            </div>
          </div>
        );
      })}

      {/* Selected Car Card Popup on Map */}
      {selectedPin && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase">Selected Vehicle</span>
            <button
              onClick={() => setSelectedPin(null)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3 items-center">
            <div className="w-20 h-16 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center p-1 shrink-0">
              <img
                src={selectedPin.image_url}
                alt={selectedPin.name}
                className="max-h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-slate-900 truncate">{selectedPin.name}</h4>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mt-0.5">
                <Star className="w-3 h-3 fill-current" /> {selectedPin.rating}
                <span className="text-slate-400 font-normal">({selectedPin.review_count})</span>
              </div>
              <div className="text-sm font-black text-indigo-600 mt-1">
                ${selectedPin.price_per_day} <span className="text-[10px] text-slate-400 font-normal">/day</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectCar(selectedPin);
            }}
            className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
          >
            View Details & Book
          </button>
        </div>
      )}

    </div>
  );
}

export default MapView;
