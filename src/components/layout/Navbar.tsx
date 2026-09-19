"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Globe, 
  ChevronDown, 
  Bell, 
  User, 
  Menu, 
  X, 
  Compass, 
  Heart, 
  PlusCircle, 
  SlidersHorizontal,
  Check
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

interface NavbarProps {
  onOpenListCarModal?: () => void;
  favoritesCount?: number;
}

export function Navbar({ onOpenListCarModal, favoritesCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [travelersOpen, setTravelersOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [currency, setCurrency] = useState("USD ($)");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand & Travelers Selector */}
          <div className="flex items-center gap-8">
            <Logo size="md" />

            {/* Travelers Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setTravelersOpen(!travelersOpen);
                  setTemplatesOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-full hover:bg-slate-50 transition"
              >
                <span>Travelers</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${travelersOpen ? "rotate-180" : ""}`} />
              </button>

              {travelersOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Categories
                  </div>
                  <Link
                    href="/"
                    onClick={() => setTravelersOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-800 rounded-xl hover:bg-slate-50 transition"
                  >
                    <Compass className="w-4 h-4 text-indigo-600" />
                    <span>Car Rentals</span>
                  </Link>
                  <a
                    href="#listings"
                    onClick={() => setTravelersOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition"
                  >
                    <span>Used Car Market</span>
                  </a>
                  <a
                    href="#listings"
                    onClick={() => setTravelersOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition"
                  >
                    <span>Airport Transfers</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Templates Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setTemplatesOpen(!templatesOpen);
                  setTravelersOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-full hover:bg-slate-50 transition"
              >
                <span>Templates</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${templatesOpen ? "rotate-180" : ""}`} />
              </button>

              {templatesOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button 
                    onClick={() => setTemplatesOpen(false)}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                  >
                    Car Rental V1
                  </button>
                  <button 
                    onClick={() => setTemplatesOpen(false)}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                  >
                    Used Car Showcase
                  </button>
                  <button 
                    onClick={() => setTemplatesOpen(false)}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                  >
                    Fleet Management
                  </button>
                </div>
              )}
            </div>

            {/* Language / Currency Selector */}
            <div className="flex items-center gap-1 text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-full hover:bg-slate-50 cursor-pointer text-sm font-medium transition">
              <Globe className="w-4 h-4" />
              <span>/</span>
              <span className="text-xs font-semibold">USD</span>
            </div>

            {/* List Your Property / Car Button */}
            <button
              onClick={onOpenListCarModal}
              className="px-4 py-2 text-sm font-medium text-slate-800 border border-slate-300 hover:border-slate-400 rounded-full hover:bg-slate-50 transition shadow-xs flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>List your car</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-900">Notifications</span>
                    <span className="text-xs text-indigo-600 font-medium">Mark all read</span>
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="p-2 rounded-xl bg-indigo-50/60 text-xs text-slate-700">
                      <p className="font-semibold text-indigo-900">Special Promo!</p>
                      <p className="text-slate-600">Get 20% discount on selected SUV rentals this weekend.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 rounded-full border border-slate-200 hover:border-slate-300 transition">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50"
          >
            Car rentals
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenListCarModal?.();
            }}
            className="w-full text-left px-3 py-2 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            + List your car
          </button>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600 px-3">
            <span>Currency: USD ($)</span>
            <span>English (US)</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
