"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Car, 
  MapPin, 
  Search,
  Calendar,
  Globe
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
  const [pickupLocation, setPickupLocation] = useState("City or Airport");
  const [dropoffLocation, setDropoffLocation] = useState("City or Airport");
  const [dateRange, setDateRange] = useState("Sep 16 - Sep 19");

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
      <div className="absolute top-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-100/30 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-100/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Headline Left + Photo Collage Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-12 lg:pb-16">
          
          {/* Left Headline */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Car rentals
            </h1>

            {/* Badges / Metrics matching template */}
            <div className="flex flex-wrap items-center gap-6 text-slate-600 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-slate-100 text-slate-700">
                  <Globe className="w-4 h-4 text-slate-700" />
                </div>
                <span>Worldwide</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-slate-100 text-slate-700">
                  <Car className="w-4 h-4 text-slate-700" />
                </div>
                <span>3,000 cars</span>
              </div>
            </div>
          </div>

          {/* Right Image Collage matching template layout */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3.5 h-[340px] sm:h-[380px]">
              {/* Left Column of collage (2 stacked images) */}
              <div className="flex flex-col gap-3.5 h-full">
                {/* Top: Blue sports car */}
                <div className="relative flex-1 rounded-2xl overflow-hidden group shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
                    alt="Blue sports car"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>

                {/* Bottom: Steering wheel & interior */}
                <div className="relative flex-1 rounded-2xl overflow-hidden group shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                    alt="Car interior cockpit"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
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

        {/* Floating Search Bar Card matching Mockup Image 3 (Pixel-for-Pixel) */}
        <div className="relative -mt-6 lg:-mt-10 z-20">
          <div className="bg-white rounded-t-[24px] rounded-b-[48px] px-6 sm:px-8 pt-5 sm:pt-6 pb-6 sm:pb-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-100 max-w-5xl mx-auto">
            
            {/* Top Toggle Switcher: Different drop off vs Same drop off */}
            <div className="flex items-center gap-2.5 mb-4">
              <button
                type="button"
                onClick={() => setIsDifferentDropoff(true)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  isDifferentDropoff
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
              >
                Different drop off
              </button>

              <button
                type="button"
                onClick={() => setIsDifferentDropoff(false)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  !isDifferentDropoff
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
              >
                Same drop off
              </button>
            </div>

            {/* Subtle Divider Line */}
            <div className="h-px bg-slate-100 mb-3" />

            {/* Inputs Form: Seamless horizontal row matching mockup */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
              
              {/* Column 1: Pick up location */}
              <div className="w-full md:flex-1 flex items-center gap-3.5 py-2 md:py-1 pr-4 group cursor-pointer">
                {/* SVG Pin Icon with inner circle matching mockup */}
                <svg
                  className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="City or Airport"
                    className="w-full text-base sm:text-[17px] font-bold text-slate-900 placeholder:text-slate-900 bg-transparent border-none p-0 focus:outline-none focus:ring-0 leading-tight"
                  />
                  <div className="text-[12px] text-slate-400 font-normal mt-0.5 leading-none">Pick up location</div>
                </div>
              </div>

              {/* Vertical Divider 1 */}
              <div className="hidden md:block w-px h-11 bg-slate-100 shrink-0 mx-2" />

              {/* Column 2: Drop off location */}
              <div className="w-full md:flex-1 flex items-center gap-3.5 py-2 md:py-1 px-0 md:px-4 group cursor-pointer">
                {/* SVG Pin Icon with inner circle matching mockup */}
                <svg
                  className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="City or Airport"
                    className="w-full text-base sm:text-[17px] font-bold text-slate-900 placeholder:text-slate-900 bg-transparent border-none p-0 focus:outline-none focus:ring-0 leading-tight"
                  />
                  <div className="text-[12px] text-slate-400 font-normal mt-0.5 leading-none">Drop off location</div>
                </div>
              </div>

              {/* Vertical Divider 2 */}
              <div className="hidden md:block w-px h-11 bg-slate-100 shrink-0 mx-2" />

              {/* Column 3: Dates */}
              <div className="w-full md:flex-1 flex items-center gap-3.5 py-2 md:py-1 px-0 md:px-4 group cursor-pointer">
                {/* Calendar Icon matching mockup */}
                <svg
                  className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="3" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>

                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    placeholder="Sep 16 - Sep 19"
                    className="w-full text-base sm:text-[17px] font-bold text-slate-900 placeholder:text-slate-900 bg-transparent border-none p-0 focus:outline-none focus:ring-0 leading-tight"
                  />
                  <div className="text-[12px] text-slate-400 font-normal mt-0.5 leading-none">Pick up - Drop off</div>
                </div>
              </div>

              {/* Column 4: Large Purple Action Search Button */}
              <div className="w-full md:w-auto flex justify-end md:pl-3 pt-2 md:pt-0 shrink-0">
                <button
                  type="submit"
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 transition-all cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 stroke-[2.4]" />
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
