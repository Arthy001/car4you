"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Globe, 
  ChevronDown, 
  Bell, 
  Menu, 
  X, 
  PlusCircle, 
  ShieldCheck,
  Tag,
  Car
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Language, translations } from "@/lib/i18n/translations";

interface NavbarProps {
  onOpenListCarModal?: () => void;
  favoritesCount?: number;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Navbar({ 
  onOpenListCarModal, 
  favoritesCount = 0,
  lang,
  onLanguageChange
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = translations[lang].nav;

  const toggleLanguage = () => {
    onLanguageChange(lang === "th" ? "en" : "th");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo & Category Selector */}
          <div className="flex items-center gap-8">
            <Logo size="md" />

            {/* Categories Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setCategoryOpen(!categoryOpen);
                  setServicesOpen(false);
                  setLangMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-full hover:bg-slate-50 transition"
              >
                <span>{t.categories}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`} />
              </button>

              {categoryOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Body Types
                  </div>
                  <a
                    href="#listings"
                    onClick={() => setCategoryOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-800 rounded-xl hover:bg-slate-50 transition"
                  >
                    <Car className="w-4 h-4 text-indigo-600" />
                    <span>{t.sedan}</span>
                  </a>
                  <a
                    href="#listings"
                    onClick={() => setCategoryOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-800 rounded-xl hover:bg-slate-50 transition"
                  >
                    <Car className="w-4 h-4 text-indigo-600" />
                    <span>{t.ev}</span>
                  </a>
                  <a
                    href="#listings"
                    onClick={() => setCategoryOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-800 rounded-xl hover:bg-slate-50 transition"
                  >
                    <Car className="w-4 h-4 text-indigo-600" />
                    <span>{t.suv}</span>
                  </a>
                  <a
                    href="#listings"
                    onClick={() => setCategoryOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-800 rounded-xl hover:bg-slate-50 transition"
                  >
                    <Car className="w-4 h-4 text-indigo-600" />
                    <span>{t.van}</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setCategoryOpen(false);
                  setLangMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-full hover:bg-slate-50 transition"
              >
                <span>{t.services}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a 
                    href="#listings"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                  >
                    <Tag className="w-4 h-4 text-indigo-600" />
                    <span>{t.buyCar}</span>
                  </a>
                  <button 
                    onClick={() => {
                      setServicesOpen(false);
                      onOpenListCarModal?.();
                    }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                  >
                    <PlusCircle className="w-4 h-4 text-indigo-600" />
                    <span>{t.sellFree}</span>
                  </button>
                  <div className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition flex items-center gap-2 cursor-pointer">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t.inspection}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher Button (TH / EN) */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-xs font-bold"
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === "th" ? "ไทย (TH)" : "English (EN)"}</span>
              </button>
            </div>

            {/* Sell Car CTA Button */}
            <button
              onClick={onOpenListCarModal}
              className="px-4 py-2 text-sm font-bold text-slate-900 border border-slate-300 hover:border-indigo-600 hover:text-indigo-600 rounded-full hover:bg-slate-50 transition shadow-xs flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>{t.sellCar}</span>
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
                    <span className="text-sm font-semibold text-slate-900">{t.notifications}</span>
                    <span className="text-xs text-indigo-600 font-medium">Clear</span>
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="p-2 rounded-xl bg-indigo-50/60 text-xs text-slate-700">
                      <p className="font-semibold text-indigo-900">Special Promo!</p>
                      <p className="text-slate-600">{lang === "th" ? "รถตู้และ SUV คัดเกรด ลดพิเศษ 20% ผ่อนเริ่มต้น 4,xxx บ./ด." : "Selected SUVs and Vans with 20% discount this month."}</p>
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
            {/* Mobile Language Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 text-slate-700"
            >
              {lang === "th" ? "TH" : "EN"}
            </button>
            
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
          <a
            href="#listings"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50"
          >
            {t.categories}
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenListCarModal?.();
            }}
            className="w-full text-left px-3 py-2 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            + {t.sellCar}
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
