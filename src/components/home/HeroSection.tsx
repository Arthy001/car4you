"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Car, 
  MapPin, 
  Calendar as CalendarIcon, 
  Search,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface HeroSectionProps {
  onSearch: (params: {
    pickup: string;
    dropoff: string;
    dates: string;
    isDifferentDropoff: boolean;
  }) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [isDifferentDropoff, setIsDifferentDropoff] = useState(true);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [dateRange, setDateRange] = useState("Sep 16 - Sep 19");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      pickup: pickupLocation,
      dropoff: isDifferentDropoff ? dropoffLocation : pickupLocation,
      dates: dateRange,
      isDifferentDropoff,
    });
  };

  return (
    <section className="relative pt-6 pb-20 lg:pb-28 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-100/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-100/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Headline Left + Collage Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-12 lg:pb-16">
          
          {/* Left Headline */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Car rentals
            </h1>

            {/* Badges / Metrics */}
            <div className="flex flex-wrap items-center gap-6 text-slate-600 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-slate-100 text-slate-700">
                  <Globe className="w-4 h-4" />
                </div>
                <span>Worldwide</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-slate-100 text-slate-700">
                  <Car className="w-4 h-4" />
                </div>
                <span>3,000 cars</span>
              </div>
            </div>
          </div>

          {/* Right Image Collage matching Mockup Image 3 */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3.5 h-[340px] sm:h-[380px]">
              {/* Left Column of collage (2 stacked images) */}
              <div className="flex flex-col gap-3.5 h-full">
                {/* Top: Blue car */}
                <div className="relative flex-1 rounded-2xl overflow-hidden group shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
                    alt="Blue sports car"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Bottom: Steering wheel & interior */}
                <div className="relative flex-1 rounded-2xl overflow-hidden group shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                    alt="Car interior cockpit"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Tall vertical red car image */}
              <div className="relative h-full rounded-2xl overflow-hidden group shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                  alt="Red car on road"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Search Bar Card */}
        <div className="relative -mt-6 lg:-mt-10 z-20">
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/70 border border-slate-100 max-w-5xl mx-auto">
            
            {/* Top Toggle Switcher: Different drop off vs Same drop off */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setIsDifferentDropoff(true)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  isDifferentDropoff
                    ? "bg-black text-white shadow-xs"
                    : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                Different drop off
              </button>

              <button
                type="button"
                onClick={() => setIsDifferentDropoff(false)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  !isDifferentDropoff
                    ? "bg-black text-white shadow-xs"
                    : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                Same drop off
              </button>
            </div>

            <div className="h-px bg-slate-100 mb-4" />

            {/* Inputs Form */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Pickup Location */}
              <div className={`${isDifferentDropoff ? "md:col-span-4" : "md:col-span-5"} flex items-center gap-3.5 px-3 py-2 rounded-2xl hover:bg-slate-50/80 transition group cursor-pointer border border-transparent hover:border-slate-200`}>
                <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="City or Airport"
                    className="w-full text-sm sm:text-base font-bold text-slate-900 placeholder:text-slate-800 bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                  />
                  <div className="text-xs text-slate-400 font-medium">Pick up location</div>
                </div>
              </div>

              {/* Dropoff Location (if different) */}
              {isDifferentDropoff && (
                <div className="md:col-span-4 flex items-center gap-3.5 px-3 py-2 rounded-2xl hover:bg-slate-50/80 transition group cursor-pointer border border-transparent hover:border-slate-200 border-l-0 md:border-l md:border-slate-100">
                  <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      placeholder="City or Airport"
                      className="w-full text-sm sm:text-base font-bold text-slate-900 placeholder:text-slate-800 bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                    />
                    <div className="text-xs text-slate-400 font-medium">Drop off location</div>
                  </div>
                </div>
              )}

              {/* Date Range Picker */}
              <div className={`${isDifferentDropoff ? "md:col-span-3" : "md:col-span-5"} flex items-center gap-3.5 px-3 py-2 rounded-2xl hover:bg-slate-50/80 transition group cursor-pointer border border-transparent hover:border-slate-200 border-l-0 md:border-l md:border-slate-100`}>
                <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    placeholder="Sep 16 - Sep 19"
                    className="w-full text-sm sm:text-base font-bold text-slate-900 placeholder:text-slate-800 bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                  />
                  <div className="text-xs text-slate-400 font-medium">Pick up - Drop off</div>
                </div>
              </div>

              {/* Round Purple Search Button */}
              <div className={`${isDifferentDropoff ? "md:col-span-1" : "md:col-span-2"} flex justify-end`}>
                <button
                  type="submit"
                  className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                  aria-label="Search cars"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
