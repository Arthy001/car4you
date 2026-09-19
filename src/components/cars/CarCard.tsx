"use client";

import React from "react";
import { 
  Star, 
  MapPin, 
  Heart, 
  Users, 
  Cog, 
  ShieldCheck, 
  Fuel, 
  Zap,
  Tag
} from "lucide-react";
import { Car } from "@/types";

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
}

export function CarCard({
  car,
  isFavorite,
  onToggleFavorite,
  onSelectCar,
}: CarCardProps) {
  const isElectric = car.fuel_type === "Electric";

  return (
    <div 
      onClick={() => onSelectCar(car)}
      className="group bg-white rounded-3xl border border-slate-100/90 hover:border-slate-200/90 p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5 cursor-pointer relative"
    >
      {/* Top Left Discount Badge (e.g. -20% OFF) */}
      {car.discount_percent && car.discount_percent > 0 ? (
        <div className="absolute top-4 left-4 z-10 bg-red-50 text-red-600 border border-red-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          -{car.discount_percent}% OFF
        </div>
      ) : null}

      {/* Top Right Heart Favorite Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(car.id);
        }}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100/80 hover:bg-slate-200/90 flex items-center justify-center transition-transform active:scale-90"
        aria-label="Save to favorites"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-slate-400 hover:text-slate-600 stroke-[2]"
          }`}
        />
      </button>

      {/* Left Column: Car Image */}
      <div className="w-full sm:w-[45%] h-44 sm:h-auto rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-slate-100/50 transition-colors">
        <img
          src={car.image_url}
          alt={car.name}
          className="w-full h-full object-contain object-center transform group-hover:scale-108 transition-transform duration-500 filter drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Right Column: Car Details matching exact Mockup layout */}
      <div className="flex-1 flex flex-col justify-between py-0.5">
        
        {/* Top details: Title, Rating, Location */}
        <div>
          {/* Car Name */}
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
            {car.name}
          </h3>

          {/* Rating & Location */}
          <div className="mt-1 space-y-1 text-xs text-slate-500">
            {/* Rating row: Star + rating + review count */}
            <div className="flex items-center gap-1.5 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{car.rating}</span>
              <span className="text-slate-400">({car.review_count})</span>
              <span className="text-slate-300 mx-1">·</span>
              <span className="text-slate-500 font-normal">{car.category}</span>
            </div>

            {/* Address */}
            <div className="flex items-center gap-1 text-slate-500 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{car.location_address}</span>
            </div>
          </div>

          {/* Specs icons row matching screenshot: 4 seats, Auto gearbox, 6 airbags */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.seats} seats</span>
            </div>

            <div className="flex items-center gap-1.5">
              {isElectric ? (
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Cog className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{car.transmission}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.airbags} airbags</span>
            </div>
          </div>
        </div>

        {/* Bottom details: Proximity distance + Price */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">
            {car.distance_airport}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              ${car.price_per_day}
            </span>
            <span className="text-xs text-slate-400 font-medium">/day</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default CarCard;
